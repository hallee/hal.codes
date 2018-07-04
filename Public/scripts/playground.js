var playground = CodeMirror(document.getElementById('playground'), {
    value: "enum LogoColor {\n\
    case red, orange, yellow, green, blue, indigo, violet\n\
}\n\
\n\
class SiteLogo {\n\
    var color: LogoColor\n\
\n\
    init(_ color: LogoColor) {\n\
        self.color = color\n\
    }\n\
}\n\
\n\
/// Called by the app to fetch this site's logo ✨\n\
func generateSiteLogo() -> SiteLogo {\n\
    let logo = SiteLogo(.indigo)\n\
    return logo\n\
}",
    mode: 'swift',
    indentUnit: 4,
    lineNumbers: true,
    theme: "one-dark"
});
