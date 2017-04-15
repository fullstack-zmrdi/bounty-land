package com.jajija.bountyland;

import android.content.Context;
import android.content.Intent;
import android.support.multidex.MultiDex;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

import com.airbnb.android.react.maps.MapsPackage;
import com.jajija.bountyland.BuildConfig;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.remobile.toast.RCTToastPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    protected void attachBaseContext(Context context) {
        super.attachBaseContext(context);
        MultiDex.install(this);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this); // If you want to use AppEventsLogger to log events.
        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }
        });
    }


    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG; // Make sure you are using BuildConfig from your own application
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new RCTToastPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new MapsPackage()
        );
    }
}
