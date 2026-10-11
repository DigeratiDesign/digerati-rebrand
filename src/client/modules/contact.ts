const MAILTO_URL = 'mailto:cabal@digerati.design?subject=Project%20Enquiry%20%E2%80%94%20Digerati';

export const contact = (): void => {
  document.querySelectorAll<HTMLAnchorElement>('[dd-contact]').forEach((element) => {
    element.setAttribute('href', MAILTO_URL);
  });
};
