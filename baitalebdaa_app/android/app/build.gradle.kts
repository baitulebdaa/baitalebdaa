import java.io.FileInputStream
import java.util.Properties

plugins {
    id("com.android.application")
    // START: FlutterFire Configuration
    id("com.google.gms.google-services")
    // END: FlutterFire Configuration
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

// The Play upload key, read from android/key.properties (never committed; see README,
// "Release"). Without it, release builds fall back to debug signing, which Play rejects.
val keystoreProperties = Properties().apply {
    val file = rootProject.file("key.properties")
    if (file.exists()) FileInputStream(file).use { load(it) }
}
val hasUploadKey = keystoreProperties.isNotEmpty()

android {
    namespace = "com.baitalebdaa.app"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    // AGP 9 turns resValue generation off by default; the flavors below use it for app_name.
    buildFeatures {
        resValues = true
    }

    defaultConfig {
        // The Play package name, confirmed 20 Oct 2026. Play never allows it to change.
        applicationId = "com.baitalebdaa.app"
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    // One flavor per environment so dev, staging and production install side by side and
    // can later point at separate Firebase projects. Run with e.g.
    //   flutter run --flavor dev --dart-define-from-file=config/dev.json
    flavorDimensions += "environment"
    productFlavors {
        create("dev") {
            dimension = "environment"
            applicationIdSuffix = ".dev"
            resValue("string", "app_name", "BAE Dev")
        }
        create("stg") {
            dimension = "environment"
            applicationIdSuffix = ".stg"
            resValue("string", "app_name", "BAE Staging")
        }
        create("prod") {
            dimension = "environment"
            resValue("string", "app_name", "Bait Al Ebdaa")
        }
    }

    signingConfigs {
        if (hasUploadKey) {
            create("upload") {
                storeFile = file(keystoreProperties.getProperty("storeFile"))
                storePassword = keystoreProperties.getProperty("storePassword")
                keyAlias = keystoreProperties.getProperty("keyAlias")
                keyPassword = keystoreProperties.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            if (!hasUploadKey) {
                logger.warn("android/key.properties not found: release build is debug-signed and cannot go to Play.")
            }
            signingConfig = signingConfigs.getByName(if (hasUploadKey) "upload" else "debug")
        }
    }
}

// TEMPORARY (18 Oct 2026): google-services.json so far registers only the production package
// (com.baitalebdaa.app), so the Google Services plugin fails for .dev and .stg. Until those two
// apps are registered in baitalebdaa-76046 (README, "Firebase"), skip the plugin's native
// config step for them. Firebase still starts from lib/firebase_options.dart, which is all
// sign-in needs. Delete this block once dev and staging have their own google-services.json.
tasks.configureEach {
    if (name.startsWith("process") && name.endsWith("GoogleServices") &&
        (name.contains("Dev") || name.contains("Stg"))
    ) {
        enabled = false
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}
