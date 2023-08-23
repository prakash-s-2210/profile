import { ICountry } from "@/types";

export const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: ICountry[] = await response.json();

    const uniqueLanguagesMap: {
      [language: string]: { name: string; image: string };
    } = {};

    countries.forEach((country) => {
      if (country.languages) {
        Object.keys(country.languages).forEach((code) => {
          const languageName = country.languages[code];
          const languageImage = country.flags.png;

          if (!uniqueLanguagesMap[languageName]) {
            uniqueLanguagesMap[languageName] = {
              name: languageName,
              image: languageImage,
            };
          }
        });
      }
    });

    const uniqueLanguages = Object.values(uniqueLanguagesMap);
    return uniqueLanguages;
  } catch (error) {
    console.log(error);
  }
};
