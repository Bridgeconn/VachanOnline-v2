## **For Adding New Language**

- Add new language name in MultiLanguageDropdown.js file
- Create a folder for new language with name as language code in locales folder in public folder (public\locales\new_language_code)
- Inside that new language_code_folder, create a file named as translation.json
- Add language code to languageCode object in store/languageData.js

## **For Adding New String**

- Update the Excel file Translation Strings.xlsx with new key and string
- Send this excel file to Translation Team for verification
- After verification, we can add that new string in the code
- Open translation.json file in each language folder, then add the string with key like “key”: “string”
- Replace that new string in the file with key. Eg : {t(“newKey”)}

## **For convert csv to json**

- Python3 need to install.
- csv file and csv_to_json.py files should be in the same folder.
- Add csv file path inside the csv_to_json.py file in line number 5.
- Run the script :- python3 csv_to_json.py.
- documentation link :- https://www.i18next.com/overview/getting-started
- Python script to https://github.com/Bridgeconn/vachan-content-scripts
