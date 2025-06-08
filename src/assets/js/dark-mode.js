function setDarkMode()
{
    var defaultThemeMode = "light";
    var themeMode;
    if (document.documentElement)
    {
        if (document.documentElement.hasAttribute("data-theme-mode"))
        {
            themeMode = document.documentElement.getAttribute("data-theme-mode") !== "" ?
                        document.documentElement.getAttribute("data-theme-mode") :
                        (localStorage.getItem("darkMode") == "0" ? "light" : "dark");
        }
        else
        {
            if (localStorage.getItem("darkMode") !== null)
            {
                themeMode = localStorage.getItem("darkMode") == "0" ? "light" : "dark";
            }
            else
            {
                themeMode = defaultThemeMode;
            }
        }

        if (themeMode === "system")
        {
            themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        document.getElementById(themeMode)?.removeAttribute('disabled');
        document.getElementById(themeMode == "dark" ? "light" : "dark")?.setAttribute('disabled', 'true');

        document.documentElement.setAttribute("data-theme-mode", themeMode);
    }
}

// let darkMode = localStorage.getItem('darkMode') == '1';  //  || true;
// let cssFile  = darkMode ? "dark." : "";

// document.write(
//     '<link rel="stylesheet" type="text/css" id="plugins-bundle" href="assets/plugins/global/plugins.' + cssFile + 'bundle.css?'    + Date.now() + '" />',
//     '<link rel="stylesheet" type="text/css" id="style-bundle"   href="assets/css/style.'              + cssFile + 'bundle.css?'    + Date.now() + '" />'
// );

// function setDarkMode()
// {
//     if (darkMode)
//         document.body.classList.add('dark-skin');
//     else
//         document.body.classList.remove('dark-skin');

//     document.getElementById(darkMode ? "dark"  : "light")?.removeAttribute('disabled');
//     document.getElementById(darkMode ? "light" : "dark")?.setAttribute('disabled', 'true');
// }