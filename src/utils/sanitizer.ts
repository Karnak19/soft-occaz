function sanitizer(string: string) {
  // Regular expression to identify HTML tags in
  return string.replace(/(<([^>]+)>)/gi, '');
}

export default sanitizer;
