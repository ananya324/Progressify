const axios = require("axios");

const fetchGithubContributions = async (username) => {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      {
        query,
        variables: {
          login: username,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const weeks =
      response.data.data.user.contributionsCollection
        .contributionCalendar.weeks;

    const contributions = [];

    weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
        });
      });
    });

    return contributions;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "GitHub contribution fetch error:",
        err.message
      );
    }

    return [];
  }
};

module.exports = {
  fetchGithubContributions,
};