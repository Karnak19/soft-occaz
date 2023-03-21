function sanitizer(string: string) {
  // Regular expression to identify HTML tags in
  // and replace things like &eacute; with 'e'

  return string
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&eacute;/g, "e")
    .replace(/&ecirc;/g, "e")
    .replace(/&aacute;/g, "a")
    .replace(/&iacute;/g, "i")
    .replace(/&oacute;/g, "o")
    .replace(/&uacute;/g, "u")
    .replace(/&ntilde;/g, "n")
    .replace(/&Aacute;/g, "A")
    .replace(/&Eacute;/g, "E")
    .replace(/&Iacute;/g, "I")
    .replace(/&Oacute;/g, "O")
    .replace(/&Uacute;/g, "U")
    .replace(/&Ntilde;/g, "N")
    .replace(/&iquest;/g, "?")
    .replace(/&iexcl;/g, "!")
    .replace(/&uuml;/g, "u")
    .replace(/&Uuml;/g, "U")
    .replace(/&auml;/g, "a")
    .replace(/&Auml;/g, "A")
    .replace(/&ouml;/g, "o")
    .replace(/&Ouml;/g, "O")
    .replace(/&euml;/g, "e")
    .replace(/&Euml;/g, "E")
    .replace(/&ccedil;/g, "c")
    .replace(/&Ccedil;/g, "C")
    .replace(/&ordf;/g, "a")
    .replace(/&ordm;/g, "o")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&bdquo;/g, "„")
    .replace(/&sbquo;/g, "‚");
}

export default sanitizer;
