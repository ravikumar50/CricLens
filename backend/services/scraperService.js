  import axios from 'axios';
  import * as cheerio from 'cheerio';

  export const getPlayerDetails = async (id) => {
    try {
      const url = `https://www.cricbuzz.com/profiles/${id}/y`;
      const res = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      const $ = cheerio.load(res.data);
      const playerData = {};

      // 1. Personal Information (Working)
      playerData.personalInfo = {};
      $('h3:contains("PERSONAL INFORMATION")').next('div').find('.w-full.bg-white').each((i, el) => {
        const label = $(el).find('div').first().text().trim();
        const value = $(el).find('div').last().text().trim();
        if (label) playerData.personalInfo[label.toLowerCase().replace(/\s+/g, "")] = value;
      });

      // 2. RECENT FORM Fix (Targeting the specific tables)
      const extractRecentForm = (type) => {
          const results = [];
          // Find the specific table by looking for the BATTING or BOWLING sub-header
          const tableContainer = $(`div:contains("${type}")`).filter(function() {
              return $(this).text().trim() === type;
          }).closest('.flex-col');

          // Target only <a> tags that contain match data (excluding 'View all')
          tableContainer.find('a[href*="/live-cricket-scores/"]').slice(0, 5).each((i, el) => {
              const row = $(el);
              results.push({
                  scoreOrWickets: row.find('div').eq(0).text().trim(),
                  opponent: row.find('div').eq(1).text().trim(),
                  format: row.find('div').eq(2).text().trim(),
                  date: row.find('div').eq(3).text().trim()
              });
          });
          return results;
      };

      playerData.battingForm = extractRecentForm("BATTING");
      playerData.bowlingForm = extractRecentForm("BOWLING");

      // 3. ICC Rankings (Working)
      playerData.iccRankings = [];
      $('h3:contains("ICC RANKINGS")').next('div').find('table tbody tr').each((i, el) => {
        const format = $(el).find('td').eq(0).text().trim();
        const current = $(el).find('td').eq(1).text().trim();
        const best = $(el).find('td').eq(2).text().trim();
        if (format && format !== "Format") playerData.iccRankings.push({ format, current, best });
      });

      // 4. Summaries (Working)
      const extractSummary = (tableTitle) => {
        const summary = {};
        const table = $(`div:contains("${tableTitle}")`).next('table');
        const headers = [];
        table.find('thead th').each((i, el) => headers.push($(el).text().trim()));
        
        table.find('tbody tr').each((i, tr) => {
          const rowLabel = $(tr).find('td').first().text().trim();
          const stats = {};
          $(tr).find('td').slice(1).each((j, td) => {
            stats[headers[j+1]] = $(td).text().trim();
          });
          summary[rowLabel] = stats;
        });
        return summary;
      };
      playerData.battingSummary = extractSummary("Batting Career Summary");
      playerData.bowlingSummary = extractSummary("Bowling Career Summary");

      // 5. Bio Summary (Working)
      playerData.bioSummary = $('#player-bio').text().trim();

      // 6. Profile Image (Working)

      const imageUrl = $('img')
        .filter((i, el) => {
          const src = $(el).attr('src') || '';
          return src.includes('cricbuzz') && src.includes('gthumb');
        })
        .first()
        .attr('src');

      playerData.image = imageUrl || null;

      // 7. Country and Flag

      // 7. Country + Flag
      const flagImg = $('img')
        .filter((i, el) => {
          const src = $(el).attr('src') || '';
          return src.includes('/30x20/'); // flag images are 30x20
        })
        .first();

      playerData.country = flagImg.attr('alt');
      playerData.flag = flagImg.attr('src');

      return playerData;
    } catch (err) {
      console.error("Error fetching player details:", err.message);
      return null;
    }
  }