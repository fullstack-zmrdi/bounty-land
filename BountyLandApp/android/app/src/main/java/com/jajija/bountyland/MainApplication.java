package com.jajija.bountyland;

import android.content.Context;
import android.support.multidex.MultiDex;

import com.jajija.bountyland.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  @Override
  protected void attachBaseContext(Context context) {
    super.attachBaseContext(context);
    MultiDex.install(this);
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
          new VectorIconsPackage(),
          new RCTToastPackage(),
          new RNGoogleSigninPackage(),
          new FacebookLoginPackage(),
          new RCTCameraPackage(),
            new MapsPackage()
    );
  }
}
