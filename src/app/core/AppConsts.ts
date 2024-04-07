export class AppConsts {

  static remoteServiceBaseUrl: string;
  static remoteJiraUrl: string;
  static atlassianUrl: string;
  static appBaseUrl: string;
  static appBaseHref: string; // returns angular's base-href parameter value if used during the publish
  static ianaTimeZone: string;
  static readonly USLocaleValue = "en-US";
  static readonly PROJECT_CODE = "TD";
  static readonly PROJECT_ID = 10050;
  static readonly MaxInt32Value = Math.pow(2, 31) - 1;
  static readonly MaxDropdownCount = 50;
  static client_id: string;
  static client_secret: string;
  static encryptSecretKey: string;
  static ipAddress: string;
  static readonly cartItem= 'cart-item'

  static localeMappings: any = [];

  static readonly authorization = {
    localStoreEncrptAuthToken: 'local_store_enc_auth_token',
    localStoreAuthToken: 'local_store_auth_token',
    localStoreAuthTokenExpiry: 'local_store_enc_auth_token_exp',
    encrptedAuthTokenName: 'enc_auth_token',
    tokenCookieName: 'tokenCookieName',
    accessToken: "access_token",
    expiry_token_date: "expiry_token_date",
    currentUser: "currentUser",
    loginInformation: "loginInformation",
    merchantId: "merchantId",
  };

  static userAppAccessLog = {
    latitude: "",
    longitude: "",
    userAgent: "",
    os: "",
    osVersion: "",
    browser: "",
    browserVersion: "",
    device: "",
    deviceType: "",
    autonomousSystem: "",
    city: "",
    country: "",
    countryCode: "",
    isp: "",
    region: "",
    regionName: "",
    timeZone: "",
    zip: "",
  }

  static readonly regularExpressions = {

    onlyNumbersAndDot: /[0-9.]/,
    numericAndDecimal: /^\d{0,5}(\.\d{0,2})?$/,
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    password: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",

    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number
    passwordWithoutSpecialCharacterRequired: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",

    //numbers allowed only
    numeric: /^[0-9]*$/,

    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/,

    //alphabets, numbers, - _ allowed
    username: /^[A-Za-z0-9_-]*$/,
    expDate: /^(0[1-9]|1[0-2])\/\d{2}$/,

    //alphabets, numbers, - allowed
    cedula: /^[a-zA-Z0-9-]*$/,

    //no space at start or end of string
    noSpaceAtStartAndEnd: /^[^\s]+(\s+[^\s]+)*$/,

    //alphabets, numbers
    alphaNumeric: /^[a-zA-Z0-9]*$/,

    //  PhoneNumber = /^([(][\d]*[)])?[\d-]*$/ ;;; Numbers, brackets , Plus and hifen
    phoneNumber: /^(?=.*[0-9])[- +()0-9]+$/,

    //all characters except injection characters
    alphaNumericSpecial: /^([^;""]*)$/,

    //[1-9] - Must be one of the digits 1-9
    //[0-9]* - followed by none, one or more additional digits
    numericWithFirstDigitNonZero: /^[1-9][0-9]*$/,

    //Numbers with dashes 1-1-111
    accountNumber: /^[0-9-]*$/,

    //Two Decimal Amount, non zero/negative upto 18 digits before decimal
    amount: /(?!^0*$)(?!^0*\.0*$)^\d{1,18}(\.\d{1,2})?$/,

    //Alphabets and Numbers with Characters . _ - , / &, No white space at start or end OR empty input , '/u' is appened for unicode support
    name: /^[^\s]+(\s+[a-zA-Z0-9.\/_,&-]+)*$/,

    //To validate latitude longitude coordinates
    latitudeLongitude: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,

    //Number with decimal opcional, two decimal
    numericWithTwoDecimal: /^\d+(\.\d{2})?$/,

    //alphabets, numbers, dash and underscore
    alphabetNumericWithDashAndUnderScore: /^[a-zA-Z0-9-_]*$/,

    //100 Alpha Numeric with Allow - and Space
    alphabetNumericWithDashAndSpace: /^[a-z\d\-_\s]+$/i,

    //Numeric and dash only {test: 33027 or 33027-8523}
    numericAndDashOnly: /^[0-9-]*$/,

    //AlphaNumeric with 1 dot restrict and after character
    websiteURL: /^([^;" "]*)\w+([\.-]?\w+)*(\.\w{1,})+$/,

    //Numeric and one dash only in mid of numerics {test: 33027 or 33027-8523}
    numericAndOnlyOneDash: /(^[0-9]+[-]*[0-9]+$)/,

  }
}

