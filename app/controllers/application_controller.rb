class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  private

    def configure_permitted_parameters
        added_attrs = [ :name, :email, :password, :password_confirmation]
        devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
        devise_parameter_sanitizer.permit :account_update, keys: added_attrs
        devise_parameter_sanitizer.permit :sign_in, keys: added_attrs
    end

    def after_sign_out_path_for(resource)
        new_user_session_path
    end
 end

#deviseをユーザー名で登録・ログインできるように修正する
