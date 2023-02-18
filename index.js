import fetch from "node-fetch";
import fs from "fs";

const searchRepositories = async (page) => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=json&per_page=100&page=${page}`
  );
  const myJson = await response.json();
  return myJson;
};

const getRepositories = async () => {
  const repositories1 = await searchRepositories(1);
  const repositories2 = await searchRepositories(2);
  const allRepositories = [...repositories1.items, ...repositories2.items];
  const repositoriesData = allRepositories.map(
    ({
      full_name,
      description,
      html_url,
      stargazers_count,
      created_at,
      updated_at,
    }) => ({
      full_name,
      description,
      html_url,
      stargazers_count,
      created_at,
      updated_at,
    })
  );
  return repositoriesData;
};

const writeRepositories = async () => {
  const repositories = await getRepositories();
  fs.writeFile(
    "repositories.json",
    JSON.stringify(repositories, null, 2),
    (err) => {
      if (err) throw new Error("Error writing file");
      console.log("Repositories saved successfully!");
    }
  );
};

writeRepositories();
