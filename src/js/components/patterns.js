export default {
    urlPattern: /(http(s?)(\s*)?:(\s*)?(\/\/)?(\s*)?)?(www)?(\s*)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\s*)?\.(\s{2,})?[a-z]{2,6}\b(\s*)?([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim,
    httpsPattern: /http(s)?(\s*)?:/gim,
    queryPattern: /\?(\s*)?(.*)=/gim,
    emailPattern: /[a-zA-Z0-9\.\_\-]+@[a-zA-Z0-9]+\.[a-zA-Z]+/gi,
};