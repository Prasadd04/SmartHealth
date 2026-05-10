import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { User, Mail, Calendar, Shield, Activity, Edit3, Camera, FileText, Settings as SettingsIcon } from "lucide-react";
import { useStore } from "../store/useStore";
import { motion } from "motion/react";

export default function Profile() {
  const { user } = useStore();

  const stats = [
    { label: "Diagnostics Run", value: "47", icon: Activity, change: "+12 this week" },
    { label: "Health Reports", value: "12", icon: FileText, change: "3 pending review" },
    { label: "Account Age", value: "3 months", icon: Calendar, change: "Since May 2026" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[40px] p-10 md:p-14 text-white overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-4xl font-serif font-black shadow-xl">
                {user?.name?.charAt(0) || "U"}
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-serif font-bold">{user?.name || "User"}</h1>
                <Badge className="bg-white/10 border-white/20 text-white">Active</Badge>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">{user?.email || "user@example.com"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="text-sm">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 mt-4 md:mt-0">
              <Edit3 size={16} className="mr-2" /> Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="metric-card bg-white p-6 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-[#4F46E5] transition-colors">
                  <stat.icon size={20} className="text-slate-600 group-hover:text-white" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <div className="text-3xl font-serif font-black text-[#0F172A] mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <Card className="lg:col-span-2 rounded-[40px] border-[#e7e4d1] overflow-hidden">
            <CardHeader className="p-8 border-b border-[#e7e4d1]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FDFBF7] rounded-xl">
                  <User size={20} className="text-[#4F46E5]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-serif text-[#0F172A]">Personal Information</CardTitle>
                  <CardDescription>Your account details and preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#94A3B8] mb-2 block">Full Name</label>
                  <div className="text-base font-semibold text-[#0F172A] bg-[#FDFBF7] p-3 rounded-xl border border-black/5">
                    {user?.name || "Not set"}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#94A3B8] mb-2 block">Email Address</label>
                  <div className="text-base font-semibold text-[#0F172A] bg-[#FDFBF7] p-3 rounded-xl border border-black/5">
                    {user?.email || "Not set"}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#94A3B8] mb-2 block">Member Since</label>
                  <div className="text-base font-semibold text-[#0F172A] bg-[#FDFBF7] p-3 rounded-xl border border-black/5">
                    May 2026
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#94A3B8] mb-2 block">Account Status</label>
                  <div className="text-base font-semibold text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    Active
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl border-[#e7e4d1] w-full">
                Update Personal Info
              </Button>
            </CardContent>
          </Card>

          {/* Preferences & Settings */}
          <Card className="rounded-[40px] border-[#e7e4d1] overflow-hidden">
            <CardHeader className="p-8 border-b border-[#e7e4d1]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FDFBF7] rounded-xl">
                  <SettingsIcon size={20} className="text-[#4F46E5]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-serif text-[#0F172A]">Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {[
                "Email notifications",
                "SMS alerts",
                "Two-factor authentication",
                "Weekly health digests"
              ].map((pref, i) => (
                <label key={i} className="flex items-center justify-between p-4 bg-[#FDFBF7] rounded-xl border border-black/5 cursor-pointer hover:border-[#4F46E5] transition-colors">
                  <span className="text-sm font-medium text-[#0F172A]">{pref}</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 accent-[#4F46E5]" />
                </label>
              ))}
              <Button variant="outline" className="rounded-xl border-[#e7e4d1] w-full mt-4">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Section */}
        <Card className="rounded-[40px] border-[#e7e4d1] overflow-hidden">
          <CardHeader className="p-8 border-b border-[#e7e4d1]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FDFBF7] rounded-xl">
                <Shield size={20} className="text-[#4F46E5]" />
              </div>
              <div>
                <CardTitle className="text-xl font-serif text-[#0F172A]">Security & Privacy</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Button variant="outline" className="rounded-xl border-[#e7e4d1] h-auto py-4 flex-col items-start">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                  <Activity size={20} className="text-blue-600" />
                </div>
                <span className="font-semibold text-sm mb-1">Change Password</span>
                <span className="text-xs text-slate-500">Update your login credentials</span>
              </Button>
              <Button variant="outline" className="rounded-xl border-[#e7e4d1] h-auto py-4 flex-col items-start">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                  <Shield size={20} className="text-emerald-600" />
                </div>
                <span className="font-semibold text-sm mb-1">Two-Factor Auth</span>
                <span className="text-xs text-slate-500">Add extra security layer</span>
              </Button>
              <Button variant="outline" className="rounded-xl border-[#e7e4d1] h-auto py-4 flex-col items-start">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                  <FileText size={20} className="text-amber-600" />
                </div>
                <span className="font-semibold text-sm mb-1">Download Data</span>
                <span className="text-xs text-slate-500">Export your personal data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
