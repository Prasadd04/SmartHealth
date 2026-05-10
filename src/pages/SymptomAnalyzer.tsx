import AppLayout from "../components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { Activity, Clipboard, Share2, ShieldAlert, Send, BrainCircuit, HeartPulse as Lung } from "lucide-react";
import { useState } from "react";
import { useStore } from "../store/useStore";
import { motion, AnimatePresence } from "motion/react";

const symptomsList = [
  "Cough", "Shortness of Breath", "Chest Pain", "Fever", "Fatigue",
  "Headache", "Sore Throat", "Muscle Ache", "Nausea", "Dizziness",
  "Runny Nose", "Loss of Taste/Smell", "Congestion", "Wheezing",
  "Rapid Heartbeat", "Night Sweats", "Loss of Appetite", "Persistent Thirst",
  "Lower Back Pain", "Eye Irritation"
];

export default function SymptomAnalyzer() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addRecord } = useStore();

  const toggleSymptom = (s: string) => {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleAnalyze = () => {
    if (selected.length < 2) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockResult = {
        diagnoses: [
          { label: "Viral Respiratory Infection", score: 0.88, logic: "Clustering of fever + cough + congestion." },
          { label: "Acute Bronchitis", score: 0.12, logic: "Absence of acute chest pain reduces pneumonia score." }
        ],
        tags: ["Viral", "Upper Respiratory", "Low Risk"],
        emergency: selected.includes("Shortness of Breath")
      };
      setResult(mockResult);
      setIsAnalyzing(false);
      addRecord({
        id: Math.random().toString(36).substr(2, 9),
        type: 'Symptom',
        date: new Date().toISOString().split('T')[0],
        result: 'Indication of Viral Respiratory Infection',
        confidence: 0.88
      });
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="rounded-[32px] border-[#e7e4d1] overflow-hidden">
            <CardHeader>
              <CardTitle className="font-serif">Patient Observations</CardTitle>
              <CardDescription>Select all applicable symptoms observed in the last 48 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-8">
                {symptomsList.map((symptom) => {
                  const isActive = selected.includes(symptom);
                  return (
                    <motion.button
                      key={symptom}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        isActive 
                          ? "bg-medical-900 text-white border-medical-900 shadow-lg shadow-medical-900/20" 
                          : "bg-white text-muted-foreground border-cream-300 hover:border-medical-500"
                      }`}
                    >
                      {symptom}
                    </motion.button>
                  );
                })}
              </div>

              <div className="bg-cream-100/50 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Selection Summary</span>
                  <span className="text-xs font-black px-2 py-1 bg-white rounded-md border border-cream-200">{selected.length} Selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.map(s => (
                    <Badge key={s} variant="secondary" className="bg-white border-cream-300 rounded-lg group">
                      {s} <button onClick={() => toggleSymptom(s)} className="ml-2 hover:text-red-500 transition-colors">×</button>
                    </Badge>
                  ))}
                  {selected.length === 0 && <p className="text-sm italic text-muted-foreground">No symptoms selected yet...</p>}
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={selected.length < 2 || isAnalyzing}
                className="w-full mt-8 rounded-2xl bg-medical-900 h-16 text-lg font-black"
              >
                {isAnalyzing ? "Processing BioBERT..." : "Analyze Symptoms"}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-[#e7e4d1] bg-black text-white p-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BrainCircuit size={24} className="text-medical-500" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-serif">ML Context: BioBERT</h4>
                <p className="text-sm opacity-60 italic leading-relaxed">
                  SmartHealth NLP utilizes a bidirectional encoder transformer (BioBERT) pre-trained on large-scale biomedical corpora (PubMed) for clinical entity recognition.
                </p>
                <div className="flex gap-3">
                  <div className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded">Entity Recognition</div>
                  <div className="text-[10px] font-bold uppercase bg-white/10 px-2 py-1 rounded">Relational Inference</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6"
              >
                <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center text-cream-400">
                  <Lung size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif">Clinical Inference Engine</h3>
                  <p className="text-muted-foreground italic mt-2">Select at least two symptoms to initiate the BioBERT diagnostic pipeline.</p>
                </div>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 space-y-12"
              >
                <div className="w-48 h-48 relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-4 border-medical-500 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border-t-4 border-medical-900 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="text-medical-900 animate-pulse" size={40} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif">Synthesizing Entities</h3>
                  <p className="text-muted-foreground animate-pulse mt-2">Correlating symtoms against 14,000 disease vectors</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {result.emergency && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 border border-red-200 p-6 rounded-3xl flex items-start gap-4"
                  >
                    <ShieldAlert className="text-red-600 flex-shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-red-900">Emergency Protocol Triggered</h4>
                      <p className="text-sm text-red-700 italic">Dyspnea (Shortness of Breath) detected. Please consult emergency services if symptoms persist or worsen.</p>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {result.diagnoses.map((diag: any, i: number) => (
                    <Card key={i} className={`rounded-[32px] border-[#e7e4d1] overflow-hidden ${i === 0 ? "ring-2 ring-medical-500 ring-offset-4" : ""}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-serif font-black">{diag.label}</h3>
                          <Badge className="bg-medical-900 text-white font-bold px-3 py-1 text-sm rounded-full">
                            {Math.round(diag.score * 100)}% Match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground italic mb-6 leading-relaxed">
                          <span className="font-bold text-medical-900 not-italic uppercase tracking-widest text-[10px] block mb-1">LIME Logic:</span>
                          {diag.logic}
                        </p>
                        <div className="flex gap-2">
                          {result.tags.map((tag: string) => (
                            <div key={tag} className="px-3 py-1 bg-cream-100 rounded-lg text-[10px] font-bold uppercase text-medical-900">
                              #{tag}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 rounded-2xl border-cream-300 h-14" onClick={() => setResult(null)}>
                    Perform New Scan
                  </Button>
                  <Button variant="secondary" className="w-14 h-14 rounded-2xl flex items-center justify-center p-0">
                    <Share2 size={20} />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
