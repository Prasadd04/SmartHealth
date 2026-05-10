import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { ShieldAlert, HeartPulse, RefreshCw, Save, Activity, Thermometer, Droplets, Wind } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from "motion/react";

const initialData = [
  { time: '10:00', heartRate: 72, temp: 36.6, forecast: null },
  { time: '11:00', heartRate: 75, temp: 36.7, forecast: null },
  { time: '12:00', heartRate: 82, temp: 36.8, forecast: null },
  { time: '13:00', heartRate: 78, temp: 36.6, forecast: null },
  { time: '14:00', heartRate: 85, temp: 36.9, forecast: 85 },
  { time: '15:00', heartRate: null, temp: null, forecast: 88, isForecast: true },
  { time: '16:00', heartRate: null, temp: null, forecast: 92, isForecast: true },
  { time: '17:00', heartRate: null, temp: null, forecast: 89, isForecast: true },
];

export default function VitalsMonitor() {
  const [vitals, setVitals] = useState({ hr: "85", bp: "120/80", temp: "36.9", spo2: "98" });
  const [data, setData] = useState(initialData);

  const handleUpdate = () => {
    // Mocking update and new forecast
    const newPoint = { 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      heartRate: parseInt(vitals.hr), 
      temp: parseFloat(vitals.temp) 
    };
    alert("Vitals captured. Regenerating LSTM forecasts...");
  };

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <Card className="rounded-[32px] border-[#e7e4d1] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif">Vital Capture</CardTitle>
              <CardDescription>Real-time physiological telemetry input.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Heart Rate (BPM)</label>
                  <div className="relative">
                    <HeartPulse className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-500" size={18} />
                    <Input 
                      value={vitals.hr} 
                      onChange={(e) => setVitals({...vitals, hr: e.target.value})}
                      className="pl-12 rounded-2xl border-cream-200 bg-cream-50 h-14 font-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Temp (°C)</label>
                  <div className="relative">
                    <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-500" size={18} />
                    <Input 
                      value={vitals.temp} 
                      onChange={(e) => setVitals({...vitals, temp: e.target.value})}
                      className="pl-12 rounded-2xl border-cream-200 bg-cream-50 h-14 font-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">BP (mmHg)</label>
                  <div className="relative">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-500" size={18} />
                    <Input 
                      value={vitals.bp} 
                      onChange={(e) => setVitals({...vitals, bp: e.target.value})}
                      className="pl-12 rounded-2xl border-cream-200 bg-cream-50 h-14 font-black"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">SpO2 (%)</label>
                  <div className="relative">
                    <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-medical-500" size={18} />
                    <Input 
                      value={vitals.spo2} 
                      onChange={(e) => setVitals({...vitals, spo2: e.target.value})}
                      className="pl-12 rounded-2xl border-cream-200 bg-cream-50 h-14 font-black"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleUpdate} className="flex-1 rounded-2xl bg-medical-900 h-14">
                  <Save size={18} className="mr-2" /> Sync Records
                </Button>
                <Button variant="outline" className="w-14 h-14 rounded-2xl border-cream-300">
                  <RefreshCw size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {parseInt(vitals.hr) > 90 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 p-6 rounded-3xl"
            >
              <div className="flex gap-4">
                <ShieldAlert className="text-orange-600 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-orange-900">Physiological Tachycardia</h4>
                  <p className="text-sm text-orange-700 italic">Detected elevated Heart Rate. Forecasting suggests a 82% probability of sustained elevation over next 2 hours.</p>
                </div>
              </div>
            </motion.div>
          )}

          <Card className="rounded-[32px] border-[#e7e4d1] bg-medical-900 text-white p-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity size={20} className="text-medical-500" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">LSTM Architecture</h4>
                <p className="text-sm opacity-60 italic leading-relaxed">
                  Recurrent units with gated memory cells analyze sequential vital data to provide look-ahead forecasts for clinical stability.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart View */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[40px] border-[#e7e4d1] overflow-hidden bg-white shadow-xl">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-serif font-black">Predictive Telemetry</CardTitle>
                  <CardDescription>Forecasts generated via LSTM Neural Network</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="rounded-md bg-cream-50 text-muted-foreground border-cream-200">History</Badge>
                  <Badge variant="outline" className="rounded-md bg-medical-50 text-medical-900 border-medical-500">Neural Forecast</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f1e6" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9e9e9e', fontWeight: 600 }}
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', padding: '12px 20px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    name="Actual Heart Rate"
                    stroke="#0c4a6e" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#0c4a6e', strokeWidth: 0 }}
                    activeDot={{ r: 8, stroke: '#fff', strokeWidth: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    name="LSTM Forecast"
                    stroke="#0ea5e9" 
                    strokeWidth={4} 
                    strokeDasharray="8 8"
                    dot={{ r: 6, fill: '#fff', stroke: '#0ea5e9', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="rounded-[32px] border-[#e7e4d1] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Wind size={20} />
                </div>
                <h4 className="font-serif font-black text-xl">Metabolic Stability</h4>
              </div>
              <p className="text-sm text-muted-foreground italic mb-6">Current vital trajectory indicates high stability. Metabolic compensation is within normal variance.</p>
              <div className="flex justify-between items-center bg-cream-50 p-4 rounded-2xl">
                <span className="text-[10px] font-bold uppercase opacity-60">Status</span>
                <span className="text-xs font-black text-green-600 uppercase tracking-widest">Normal</span>
              </div>
            </Card>

            <Card className="rounded-[32px] border-[#e7e4d1] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                  <HeartPulse size={20} />
                </div>
                <h4 className="font-serif font-black text-xl">Cardiac Rhythm</h4>
              </div>
              <p className="text-sm text-muted-foreground italic mb-6">Standard sinus rhythm observed. No significant ectopic triggers identified in recent buffer.</p>
              <div className="flex justify-between items-center bg-cream-50 p-4 rounded-2xl">
                <span className="text-[10px] font-bold uppercase opacity-60">Status</span>
                <span className="text-xs font-black text-medical-900 uppercase tracking-widest">Stable</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
