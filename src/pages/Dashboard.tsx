import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Activity, Users, ShieldCheck, Clock, ArrowUpRight, Plus, Scan, Clipboard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 7 },
  { name: 'Thu', value: 5 },
  { name: 'Fri', value: 8 },
  { name: 'Sat', value: 2 },
  { name: 'Sun', value: 6 },
];

export default function Dashboard() {
  const { records } = useStore();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-[#0F172A]">Multimodal Diagnostics</h1>
          <p className="text-sm text-[#94A3B8] mt-1 italic">Personalized Care, Driven By Intelligence</p>
        </div>
        <div className="flex gap-2">
          <div className="tech-tag">Pytorch: DenseNet121</div>
          <div className="tech-tag">BioBERT: NLP-X</div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "CV Accuracy", val: "94%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Recall Rate", val: "89%", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Clinics", val: "500+", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Processing", val: "Real-time", icon: Clock, color: "text-slate-600", bg: "bg-slate-50" },
        ].map((kpi, i) => (
          <div key={i} className="metric-card">
            <div className="metric-val">{kpi.val}</div>
            <div className="metric-label">{kpi.label}</div>
            <div className="mt-4 flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                <kpi.icon size={14} className={kpi.color} />
              </div>
              <span className="text-[10px] font-bold text-[#94A3B8]">System Benchmark High</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main activity chart */}
        <Card className="lg:col-span-2 rounded-3xl border-black/5 shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-serif">Diagnostic Pulse</CardTitle>
              <CardDescription>Engagement metrics across 30-day window</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full text-[#94A3B8]">Filter <ArrowUpRight size={14} className="ml-1" /></Button>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', fontSize: '12px' }}
                  cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                />
                <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Diagnostic Insights from design prompt */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-black/5 shadow-sm p-8 bg-white">
            <span className="text-[10px] uppercase tracking-[0.1em] text-[#94A3B8] font-bold block mb-4">Diagnostic Insights</span>
            <div className="text-sm leading-relaxed text-[#475569] space-y-4">
              <p><strong>BioBERT NLP Inference:</strong> Patient reports persistent cough and acute chest pain over 72h duration.</p>
              <p><strong>LSTM Forecast:</strong> Respiratory rate trending +12% above baseline. Anomaly detected in cardiac rhythm (92bpm).</p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/5">
              <div className="flex gap-2">
                <Button 
                  onClick={() => navigate('/analyze/xray')}
                  className="flex-1 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] h-12 text-sm"
                >
                  <Scan size={18} className="mr-2" /> Start Analysis
                </Button>
              </div>
            </div>
          </Card>

          <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
            <div className="text-[#991B1B] text-[10px] font-bold uppercase tracking-[0.1em] mb-1">Urgent Alert</div>
            <p className="text-[#B91C1C] text-sm italic">Potential HIPAA compliance flag: Verify data encryption before export.</p>
          </div>
        </div>
      </div>


      {/* Recent Records Table */}
      <Card className="mt-8 rounded-[32px] border-[#e7e4d1] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-serif">Recent Records</CardTitle>
          <Button variant="ghost" onClick={() => navigate('/reports')}>View All</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#e7e4d1] text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  <th className="pb-4 px-4">Analysis Type</th>
                  <th className="pb-4 px-4">Date</th>
                  <th className="pb-4 px-4">Observation</th>
                  <th className="pb-4 px-4">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f1e6]">
                {records.map((record) => (
                  <tr key={record.id} className="group hover:bg-[#f9f8f3] transition-colors cursor-pointer" onClick={() => navigate('/reports')}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center text-[#0c4a6e]">
                          {record.type === 'X-Ray' ? <Scan size={16} /> : <Clipboard size={16} />}
                        </div>
                        <span className="font-bold">{record.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{record.date}</td>
                    <td className="py-4 px-4 truncate max-w-xs italic">{record.result}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={record.confidence * 100} className="w-20 h-1.5" />
                        <span className="text-xs font-bold">{(record.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
