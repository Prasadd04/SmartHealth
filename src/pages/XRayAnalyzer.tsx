import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Upload, Search, CheckCircle2, ShieldAlert, Info, Activity } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store/useStore";
import { motion, AnimatePresence } from "motion/react";

export default function XRayAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addRecord } = useStore();

  const handleUpload = () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        prediction: "Pneumonia Detected",
        confidence: 0.942,
        classes: [
          { label: "Pneumonia", score: 0.942 },
          { label: "Effusion", score: 0.12 },
          { label: "Normal", score: 0.05 },
        ],
        heatmapRect: { x: 120, y: 150, w: 100, h: 120 }
      };
      setResult(mockResult);
      setIsAnalyzing(false);
      addRecord({
        id: Math.random().toString(36).substr(2, 9),
        type: 'X-Ray',
        date: new Date().toISOString().split('T')[0],
        result: 'Pneumonia Detected (Right Middle Lobe)',
        confidence: 0.94
      });
    }, 2500);
  };

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="rounded-[32px] border-[#e7e4d1] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif">Image Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-colors ${
                  file ? "border-medical-500 bg-medical-50" : "border-cream-300 bg-cream-50"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
                }}
              >
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-medical-900">
                  <Upload size={24} />
                </div>
                <h4 className="font-bold mb-2">Drag & Drop Chest X-Ray</h4>
                <p className="text-xs text-muted-foreground mb-6 max-w-[200px]">Supports DICOM, JPEG, PNG up to 10MB.</p>
                <input 
                  type="file" 
                  id="xray-upload" 
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                />
                <Button onClick={() => document.getElementById('xray-upload')?.click()} variant="outline" className="rounded-full px-8 border-cream-300">
                  Select File
                </Button>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-white border border-[#e7e4d1] rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cream-100 rounded-lg flex items-center justify-center">
                      <Scan size={20} className="text-medical-900" />
                    </div>
                    <div>
                      <p className="text-sm font-bold truncate max-w-[150px]">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-black">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleUpload} 
                    disabled={isAnalyzing}
                    className="rounded-full bg-medical-900"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Activity size={16} />
                        </motion.div>
                        Analyzing...
                      </>
                    ) : (
                      "Start Diagnostics"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-[#e7e4d1] bg-medical-900 text-white p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info size={20} className="text-medical-500" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">Model Convergence</h4>
                <p className="text-sm opacity-70 italic leading-relaxed">
                  Our DenseNet121 architecture utilizes a weighted binary cross-entropy loss to account for class imbalance in the ChestX-ray14 dataset.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[32px] border-[#e7e4d1] min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-black/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!result && !isAnalyzing && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Search size={48} className="mx-auto text-slate-300" />
                  <div>
                    <h3 className="text-xl font-serif">Neural Visualization</h3>
                    <p className="text-sm text-slate-400 italic">Upload a scan for DenseNet121 feature mapping.</p>
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div 
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full space-y-6"
                >
                  <div className="relative w-64 h-64 mx-auto border-4 border-indigo-500/10 rounded-full flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-indigo-500/10 rounded-full"
                    />
                    <Activity size={48} className="text-indigo-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif">Extracting Features</h3>
                    <p className="text-sm text-slate-400">Processing scan ID: #PX-99281-SH</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col h-full"
                >
                  <div className="viz-header flex flex-row items-center justify-between px-8 border-b border-black/5 shrink-0 bg-white">
                    <h3 className="text-lg font-serif">Neural Output</h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Confidence: 94.2%</span>
                  </div>

                  <div className="flex-1 bg-[#111] m-6 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-2xl">
                    <svg width="300" height="300" viewBox="0 0 100 100" opacity="0.6">
                      <rect x="20" y="10" width="60" height="80" fill="#333" rx="4"/>
                      <path d="M30 20 Q50 15 70 20 L70 80 Q50 85 30 80 Z" fill="#555"/>
                      <path d="M35 25 Q50 22 65 25 L65 75 Q50 78 35 75 Z" fill="#666"/>
                      <circle cx="50" cy="50" r="20" fill="none" stroke="#888" strokeWidth="0.5"/>
                    </svg>

                    <div className="absolute top-[30%] left-[25%] border-2 border-red-500 rounded-full w-24 h-24 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
                      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap uppercase tracking-widest">
                        Pneumonia High-Density
                      </div>
                    </div>

                    <div className="absolute top-[55%] right-[25%] border-2 border-amber-400 rounded-full w-20 h-20 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-amber-400 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap uppercase tracking-widest">
                        Effusion Trace
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8 space-y-6 text-left">
                    <div className="grid grid-cols-3 gap-6 pt-2">
                       {result.classes.map((cls: any, i: number) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-400">
                            <span>{cls.label}</span>
                            <span className="text-slate-600">{Math.round(cls.score * 100)}%</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${cls.score * 100}%` }}
                              className={`h-full ${i === 0 ? "bg-indigo-600" : "bg-slate-300"}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-xl bg-indigo-600 h-12 font-bold shadow-lg shadow-indigo-600/20" onClick={() => setResult(null)}>
                        Confirm Analysis
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold border-black/5" onClick={() => setResult(null)}>
                        Second Opinion
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

function Scan({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 17v2a2 2 0 0 0 2 2h2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}
