/**
 * Liorre — Customer Feedback Google Form generator.
 *
 * HOW TO USE (one time, ~2 minutes):
 *  1. Sign in to Google as oraeongroup@gmail.com (the form will be owned by this account).
 *  2. Open https://script.google.com → "New project".
 *  3. Delete the sample code, paste this whole file, click Save.
 *  4. Choose the function "createLiorreFeedbackForm" in the toolbar and click Run.
 *  5. Click "Review permissions" → choose the account → Advanced → "Go to project" → Allow.
 *  6. Open "Execution log": copy the PUBLIC FORM LINK and send it to the web developer
 *     (it goes into SITE.reviewFormUrl in lib/site.ts).
 *
 * What you get:
 *  - A permanent Google Form "Liorre — Customer Feedback".
 *  - A Google Sheet "Liorre Feedback Responses" collecting every answer.
 *  - An email to NOTIFY_EMAIL for every new response.
 * Running it again will NOT create a duplicate; it just prints the existing links.
 */

const NOTIFY_EMAIL = 'oraeongroup@gmail.com';

const PRODUCTS = [
  'Lost in Kyoto — Oversized Black',
  'Focus — The Journey Begins Within — Oversized White',
  'Built Different — Oversized Lava Black Acid Wash',
  'Shiki — Four Seasons — Oversized Beige',
  'Have Wine, Be Fine — Oversized Grape Wine Acid Wash',
  'One Step At A Time — Oversized Bottle Green Acid Wash',
  'Maroon Line Art — Regular Fit',
  'Nomad Culture — Regular Fit Black',
  'Polo — Navy Blue',
  'Polo — Sage Green',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function createLiorreFeedbackForm() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('FORM_ID');
  if (existingId) {
    const existing = FormApp.openById(existingId);
    Logger.log('Form already exists — nothing new created.');
    logLinks_(existing);
    return;
  }

  const form = FormApp.create('Liorre — Customer Feedback');
  form
    .setDescription(
      'Thank you for choosing Liorre! Your feedback helps us craft better T-shirts.\n' +
        'It takes about 2 minutes. Liorre — Dreams Are Valid.'
    )
    .setConfirmationMessage(
      'Thank you for your feedback! 🙏 It means a lot to the Liorre team.\n' +
        'Follow us on Instagram @liorre2026 for new drops.'
    )
    .setProgressBar(true)
    .setShowLinkToRespondAgain(true)
    .setCollectEmail(false)
    .setAllowResponseEdits(false);

  // ---- Section 1: About you ----
  form.addSectionHeaderItem().setTitle('About You');
  form.addTextItem().setTitle('Your Name').setRequired(true);
  form
    .addTextItem()
    .setTitle('Email')
    .setHelpText('Optional — only used if we need to follow up.')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());
  form.addTextItem().setTitle('WhatsApp / Phone Number').setHelpText('Optional');
  form.addTextItem().setTitle('City').setHelpText('Optional');

  // ---- Section 2: Your purchase ----
  form.addPageBreakItem().setTitle('Your Purchase');
  form
    .addCheckboxItem()
    .setTitle('Which Liorre T-shirt(s) did you buy?')
    .setChoiceValues(PRODUCTS)
    .showOtherOption(true)
    .setRequired(true);
  form.addListItem().setTitle('Size you ordered').setChoiceValues(SIZES).setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('Where did you order from?')
    .setChoiceValues(['WhatsApp', 'Instagram', 'Website', 'In person / event'])
    .showOtherOption(true);

  // ---- Section 3: Ratings ----
  form.addPageBreakItem().setTitle('Rate Your Liorre').setHelpText('1 = Poor, 5 = Excellent');
  scale_(form, 'Overall rating', true);
  scale_(form, 'Fabric softness', true);
  scale_(form, 'Comfort while wearing', true);
  scale_(form, 'Print / design quality', true);
  scale_(form, 'Stitching & finishing', false);
  scale_(form, 'Value for money', false);
  scale_(form, 'Ordering & delivery experience', false);
  form
    .addMultipleChoiceItem()
    .setTitle('How was the fit?')
    .setChoiceValues(['Runs small', 'True to size', 'Runs large'])
    .setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('How did it hold up after washing?')
    .setChoiceValues([
      'Looks as good as new',
      'Slight fading / shrinkage',
      'Noticeable fading / shrinkage',
      "Haven't washed it yet",
    ]);

  // ---- Section 4: Your words ----
  form.addPageBreakItem().setTitle('Tell Us More');
  form.addParagraphTextItem().setTitle('What did you love most?');
  form.addParagraphTextItem().setTitle('What can we improve?');
  form
    .addParagraphTextItem()
    .setTitle('Write a short review we can share')
    .setHelpText('One or two lines about your Liorre experience.');
  form
    .addScaleItem()
    .setTitle('How likely are you to recommend Liorre to a friend?')
    .setBounds(0, 10)
    .setLabels('Not likely', 'Extremely likely')
    .setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('May we feature your review on our website and Instagram?')
    .setChoiceValues(['Yes, with my first name and city', 'Yes, but keep me anonymous', 'No, keep it private'])
    .setRequired(true);
  form
    .addMultipleChoiceItem()
    .setTitle('Would you like updates about new drops and offers?')
    .setChoiceValues(['Yes, on WhatsApp', 'Yes, by email', 'No, thanks']);

  // Responses → Google Sheet
  const sheet = SpreadsheetApp.create('Liorre Feedback Responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Email alert for every new response
  ScriptApp.newTrigger('emailNewResponse').forForm(form).onFormSubmit().create();

  props.setProperty('FORM_ID', form.getId());
  props.setProperty('SHEET_URL', sheet.getUrl());
  Logger.log('✅ Liorre feedback form created.');
  logLinks_(form);
}

function scale_(form, title, required) {
  return form.addScaleItem().setTitle(title).setBounds(1, 5).setLabels('Poor', 'Excellent').setRequired(required);
}

function logLinks_(form) {
  Logger.log('PUBLIC FORM LINK (put on website): ' + form.getPublishedUrl());
  Logger.log('Edit form: ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + PropertiesService.getScriptProperties().getProperty('SHEET_URL'));
}

// Runs automatically on each submission (installed by the trigger above).
function emailNewResponse(e) {
  const rows = e.response.getItemResponses().map(function (r) {
    let answer = r.getResponse();
    if (Array.isArray(answer)) answer = answer.join(', ');
    return '<tr><td style="padding:6px 12px;color:#555;vertical-align:top"><b>' +
      escape_(r.getItem().getTitle()) + '</b></td><td style="padding:6px 12px">' +
      escape_(String(answer)) + '</td></tr>';
  });
  const overall = e.response
    .getItemResponses()
    .filter(function (r) { return r.getItem().getTitle() === 'Overall rating'; })
    .map(function (r) { return r.getResponse(); })[0];

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New Liorre feedback' + (overall ? ' — ' + overall + '★' : ''),
    htmlBody: '<h2>New Liorre customer feedback</h2><table style="border-collapse:collapse">' + rows.join('') + '</table>',
  });
}

function escape_(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
