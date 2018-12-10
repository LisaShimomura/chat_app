class FriendshipsController < ApplicationController

  def create
      @user = User.find(params[:to_user_id])
    if current_user.friend?(@user)
      redirect_to root_path
    else
      current_user.make_friend_with(@user)
      redirect_to root_path
    end
  end

  def destroy
      @user = User.find(params[:id])
    if current_user.friend?(@user)
      current_user.break_off_friend(@user)
      redirect_to root_path
    else
      redirect_to root_path
    end
  end

end
