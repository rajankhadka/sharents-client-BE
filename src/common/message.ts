export const SuccessMessage = {
  login: '%s successfully',
  register: 'user %s successfully',
  newToken: '%s generated successfully',
  fetch: '%s fetch successfully',
  updatePassword: '%s password updated successfully',
  updateUserProfile: '%s updated successfully',
  deactivate: '%s deactivated successfully',
  remove: '%s removed successfully',
  userProfileDeleted: '%s deleted successfully',
  uploadProfile: '%s uploaded successfully',
  updateProfilePicture: '%s updated successfully',
  userProfileForgetPasswordOtp:
    '%s otp for forget password generated successfully',
};

export const ErrorMessage = {
  TokenExpiredError: 'Token has been expired',
  JsonWebTokenError: 'Token has been expired',
  UnauthorizedException: 'Client unauthorized',
  NotFoundException: 'Client request cannot be found',
  PayloadTooLargeException: 'Uploaded file size exceed',
};
