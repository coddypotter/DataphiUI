import { PatientUiPage } from './app.po';

describe('patient-ui App', function() {
  let page: PatientUiPage;

  beforeEach(() => {
    page = new PatientUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
