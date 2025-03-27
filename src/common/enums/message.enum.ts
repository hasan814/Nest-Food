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
  CodeNotFound = "Code record not found.",
  NotFoundMenu = "The requested Menu was not found.",
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
  Created = 'Created successfully',
  LoggedOut = 'Logout successful.',
  Updated = 'Updated successfully.',
  Deleted = 'Deleted successfully.',
  Retrieved = 'Retrieved successfully.',
  Registered = 'Registration successful.',
  MenuCreated = 'Menu created successfully',
  MenuDeleted = 'Menu deleted successfully.',
  DeletedMenu = 'Menu Deleted successfully.',
  AddedBasket = 'Added to Basket Successfully.',
  BasketDeleted = 'Basket Deleted successfully.',
  UploadDoc = 'Documents Uploaded successfully.',
  DiscountCreated = 'Discount Created successfully',
  UpdatedInfo = 'Information Updated successfully.',
  CategoryCreated = 'Category created successfully',
  DiscountDeleted = 'Discount Deleted successfully.',
}

export enum BasketMessage {
  FOOD_NOT_FOUND = 'Food not found',
  EMPTY_BASKET = 'Basket is empty',
  DISCOUNT_EXPIRED = 'Discount has expired',
  BASKET_ITEM_NOT_FOUND = 'Basket item not found',
  USER_NOT_FOUND = 'User not found or invalid user ID',
  BASKET_ITEM_DELETE = 'Basket item Deleted Successfully',
  DISCOUNT_LIMIT_REACHED = 'Discount usage limit reached',
  DISCOUNT_ALREADY_USED = 'Discount already applied to basket',
  DISCOUNT_NOT_FOUND_IN_BASKET = 'Discount not found in basket',
  SUPPLIER_HAS_NO_ITEMS = 'Basket has no items from this supplier',
  DISCOUNT_NOT_FOUND_OR_INACTIVE = 'Discount not found or inactive',
  SUPPLIER_DISCOUNT_CONFLICT = 'Another discount from this supplier already exists',
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

  // Supplier
  ExistSupplier = 'Supplier Account already exist.',
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

