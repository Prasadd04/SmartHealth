import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Search, Filter, Download, ExternalLink, Scan, Clipboard, Activity } from "lucide-react";
import { useStore } from "../store/useStore";
import { useState } from "react";

export default function Reports() {
  const { records } = useStore();
  const [filter, setFilter] = useState("All");

  const filteredRecords = filter === "All" ? records : records.filter(r => r.type === filter);

  return (
    <AppLayout>
      <Card className="rounded-[40px] border-[#e7e4d1] overflow-hidden">
        <CardHeader className="p-8 border-b border-[#e7e4d1]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <CardTitle className="text-3xl font-serif font-black">Health Reports Archive</CardTitle>
              <p className="text-muted-foreground mt-2 italic">Comprehensive history of all multimodal AI diagnostics.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-cream-300">
                <Download size={18} className="mr-2" /> Export PDF
              </Button>
              <Button className="rounded-xl bg-medical-900">
                Generate Summary
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
            {["All", "X-Ray", "Symptom", "Vitals"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filter === t 
                    ? "bg-medical-900 text-white border-medical-900" 
                    : "bg-white text-muted-foreground border-cream-300 hover:border-medical-500"
                }`}
              >
                {t} Cases
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream-50/50 border-b border-[#e7e4d1] text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  <th className="py-6 px-8">Report ID</th>
                  <th className="py-6 px-8">Analysis Stream</th>
                  <th className="py-6 px-8">Diagnosis / Observation</th>
                  <th className="py-6 px-8">AI Confidence</th>
                  <th className="py-6 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f2f1e6]">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-cream-50 transition-colors">
                    <td className="py-6 px-8 font-mono text-[10px] font-bold text-medical-900">#{record.id.toUpperCase()}</td>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#e7e4d1] flex items-center justify-center text-medical-900 shadow-sm">
                          {record.type === 'X-Ray' ? <Scan size={18} /> : record.type === 'Symptom' ? <Clipboard size={18} /> : <Activity size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{record.type}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black">{record.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 max-w-sm">
                      <div className="text-sm font-medium italic">{record.result}</div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase opacity-60">
                          <span>Recall Accuracy</span>
                          <span>{(record.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-32 h-2 bg-cream-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-medical-500 rounded-full" 
                            style={{ width: `${record.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <ExternalLink size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecords.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto text-cream-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-serif">No records found</h3>
              <p className="text-muted-foreground italic">Try adjusting your filters or initiate a new diagnostic scan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
