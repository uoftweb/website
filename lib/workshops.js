import path from "path";
import fs from "fs";
import YAML from "yaml";

const root = process.cwd();
const workshopsRoot = path.join(root, "content", "workshops");
const pathRegex = /^((\d{4})\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]))\-(.*)\.yml$/;

export async function getWorkshopPaths() {
  const paths = await fs.promises.readdir(workshopsRoot);
  const validPaths = paths
    .filter((p) => p.match(pathRegex))
    .map((p) => {
      const [_, date, year, month, day, slug] = p.match(pathRegex);
      return {
        path: p,
        slug,
      };
    });
  return validPaths;
}

export async function getWorkshops() {
  const paths = await fs.promises.readdir(workshopsRoot);
  const validPaths = paths.filter((p) => p.match(pathRegex));
  const workshops = await Promise.all(
    validPaths.map(async (p) => {
      const [_, date, year, month, day, slug] = p.match(pathRegex);
      const source = await fs.promises.readFile(
        path.join(workshopsRoot, p),
        "utf8"
      );
      const workshop = YAML.parse(source);
      return { ...workshop, slug };
    })
  );
  return workshops;
}
