export enum InternalServerMessage {
  UploadFailed = "Unable to upload file to storage.",
  SaveFailed = "Could not save data. Please try again later.",
  UpdateFailed = "Failed to update the item.",
  DeleteFailed = "Failed to delete the item.",
  DatabaseError = "Database Error.",
}



export enum AuthMessage {
  TryAgain = "An error occurred. Please try again!",
  LoginAgain = "Your session has expired. Please log in again.",
  LoginRequired = "You must be logged in to access this resource.",
  Blocked = "Your account has been blocked. Please contact support.",
  NotFoundAccount = "No account was found with the provided details.",
  AlreadyExistAccount = "An account with this information already exists.",
  ExpiredCode = "The verification code has expired. Please request a new one.",
}


export enum NotFoundMessage {
  TypeNotFound = "Type not found.",
  OtpNotFound = "OTP record not found.",
  UserNotFound = "The specified user was not found.",
  NotFoundPost = "The requested post was not found.",
  NotFoundCategory = "The requested category was not found.",
  ResourceNotFound = "The requested resource was not found.",
  NotFoundSupplier = "The requested Supplier was not found.",
}

export enum ValidationMessage {
  InvalidImageFormat = "The image format is incorrect.",
  InvalidEmailFormat = "The email format is incorrect.",
  InvalidPhoneNumberFormat = "The phone number format is incorrect.",
  RequiredFieldMissing = "A required field is missing.",
  PasswordTooWeak = "The provided password is too weak. Please use a stronger password.",
}



export enum SupplierStatus {
  Register = "REGISTER",
  Verified = "VERIFIED",
  Rejected = "REJECTED",
  Suspended = "SUSPENDED",
  Accept = "ACCEPTED",
  Contract = "CONTRACT_SIGNED",
  UploadedDocument = "DOCUMENTS_UPLOADED",
  SupplementaryInfo = "SUPPLEMENTARY_INFO",
}

export enum PublicMessage {
  OTP = 'Otp sent successful.',
  LoggedIn = 'Login successful.',
  LoggedOut = 'Logout successful.',
  Updated = 'Updated successfully.',
  Deleted = 'Deleted successfully.',
  Created = 'Created successfully.',
  Retrieved = 'Retrieved successfully.',
  Registered = 'Registration successful.',
}

export enum BadRequestMessage {
  // General
  NotFound = 'Item not found.',
  SomeThingWrong = 'Something went wrong.',
  MissingRequiredFields = 'Missing required fields.',
  InvalidData = 'Invalid input data.',
  AlreadyAccepted = 'Invalid combination of fields.',

  // Auth
  InvalidCredentials = 'Invalid email or password.',
  TokenInvalid = 'Invalid or expired token.',
  AccountDisabled = 'Your account is disabled.',

  // Basket
  InvalidBasketData = 'Invalid basket data.',
  DiscountNotValid = 'Discount is not valid or expired.',
  DiscountLimitExceeded = 'Discount usage limit exceeded.',

  // Discount
  InvalidDiscountType = 'Only one of amount or percent should be provided.',

  // Menu
  InvalidMenuData = 'Invalid menu item data.',

  // Category
  InvalidCategory = 'Invalid category data.',

  // User
  UserNotFound = 'User not found.',
  PasswordsDoNotMatch = 'Passwords do not match.',

  // Supplier
  SupplierNotFound = 'Supplier not found.',
}

export enum ConflictMessage {
  Exist = 'Conflict: This item already exists.',
  EmailExist = 'Email is already registered.',
  UsernameExist = 'Username is already taken.',

  // Basket
  DiscountAlreadyApplied = 'Discount already applied to this basket item.',
  ItemAlreadyInBasket = 'Item already exists in the basket.',

  // Discount
  CodeAlreadyUsed = 'Discount code already used.',
}

export enum ForbiddenMessage {
  NoPermission = 'You do not have permission to perform this action.',

  // Discount
  UnauthorizedDiscount = 'You are not allowed to use this discount.',

  // User
  NotAuthorized = 'You are not authorized to access this resource.',

  // Supplier
  SupplierAccessDenied = 'Supplier access denied.',
}

