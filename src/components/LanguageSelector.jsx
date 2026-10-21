import {
    useTranslation
} from "react-i18next";


function LanguageSelector() {

    const {
        i18n
    } = useTranslation();


    const handleLanguageChange = (e) => {

        const language =
            e.target.value;


        i18n.changeLanguage(
            language
        );


        localStorage.setItem(
            "language",
            language
        );

    };


    return (

        <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="language-selector"
        >

            <option value="en">

                English

            </option>

            <option value="mr">

                मराठी

            </option>

        </select>

    );

}


export default LanguageSelector;