import ProfilePhotoForm from "@/app/_ui/components/settings/profilePhotoUpdate";
import PersonalInfoForm from "@/app/_ui/components/settings/personalInfoUpdate";
import PassowrdUpdate from "@/app/_ui/components/settings/passowrdUpdate";
import { Suspense } from "react";
import LoadingSpinner from "@/app/profile/loading";
export default function SettingsView() {
  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<LoadingSpinner />}>
            <ProfilePhotoForm />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PersonalInfoForm />
          </Suspense>
          <PassowrdUpdate />
        </div>
      </div>
    </div>
  );
}
