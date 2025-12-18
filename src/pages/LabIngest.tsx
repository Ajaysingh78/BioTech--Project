// ✅ PREMIUM LAB INTEGRATION INTERFACE
// Hospital-grade lab data ingestion with NLP-powered MDR detection

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FlaskConical, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Microscope,
  FileSpreadsheet,
  Zap,
  Activity,
  Database,
  Brain
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const LabIngest = () => {
  const [labText, setLabText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [detectedPathogens, setDetectedPathogens] = useState<string[]>([]);

  const sampleLabReport = `Patient ID: P-10234
Name: Rajesh Kumar
Date: December 17, 2024
Specimen: Blood Culture

RESULTS:
Organism Identified: Staphylococcus aureus
Antibiotic Sensitivity:
- Methicillin: RESISTANT (MRSA)
- Vancomycin: Sensitive
- Clindamycin: Resistant
- Linezolid: Sensitive

RECOMMENDATION: Contact isolation precautions. Notify infection control.`;

  const handleUpload = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate file processing with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setDetectedPathogens(['MRSA', 'Clindamycin-R']);
          toast.success('Lab results processed successfully!', {
            description: 'Detected 1 MDR organism with 2 resistance markers',
            icon: '🦠',
            duration: 5000
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleTextProcess = () => {
    if (!labText.trim()) {
      toast.error('Please enter lab report text');
      return;
    }
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate NLP processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Simple NLP simulation - detect keywords
          const detected = [];
          if (labText.toLowerCase().includes('mrsa') || labText.toLowerCase().includes('methicillin resistant')) {
            detected.push('MRSA');
          }
          if (labText.toLowerCase().includes('vre') || labText.toLowerCase().includes('vancomycin resistant')) {
            detected.push('VRE');
          }
          if (labText.toLowerCase().includes('esbl')) {
            detected.push('ESBL');
          }
          if (labText.toLowerCase().includes('cre') || labText.toLowerCase().includes('carbapenem resistant')) {
            detected.push('CRE');
          }
          
          setDetectedPathogens(detected);
          
          if (detected.length > 0) {
            toast.success(`Detected ${detected.length} MDR organism(s)`, {
              description: detected.join(', '),
              icon: '🦠',
              duration: 5000
            });
          } else {
            toast.info('No MDR organisms detected', {
              description: 'Lab report processed successfully',
              duration: 3000
            });
          }
          return 100;
        }
        return prev + 12;
      });
    }, 180);
  };

  const fillSampleData = () => {
    setLabText(sampleLabReport);
    toast.info('Sample lab report loaded', {
      description: 'Click "Process Lab Report" to analyze',
      duration: 3000
    });
  };

  const mdrPathogens = [
    {
      name: 'MRSA',
      fullName: 'Methicillin-resistant Staphylococcus aureus',
      color: 'from-red-500 to-red-600',
      icon: '🦠',
      prevalence: '45%'
    },
    {
      name: 'VRE',
      fullName: 'Vancomycin-resistant Enterococcus',
      color: 'from-orange-500 to-orange-600',
      icon: '🔴',
      prevalence: '28%'
    },
    {
      name: 'ESBL',
      fullName: 'Extended-spectrum beta-lactamase',
      color: 'from-yellow-500 to-yellow-600',
      icon: '🟡',
      prevalence: '18%'
    },
    {
      name: 'CRE',
      fullName: 'Carbapenem-resistant Enterobacteriaceae',
      color: 'from-purple-500 to-purple-600',
      icon: '🟣',
      prevalence: '9%'
    }
  ];

  const systemCapabilities = [
    {
      icon: Brain,
      title: 'NLP-Powered Detection',
      description: 'Advanced natural language processing for accurate MDR identification',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant analysis and alert generation within seconds',
      color: 'text-yellow-500'
    },
    {
      icon: Database,
      title: 'Auto Integration',
      description: 'Seamless integration with patient records and contact tracing',
      color: 'text-green-500'
    },
    {
      icon: Activity,
      title: 'Pattern Recognition',
      description: 'Identifies resistance patterns and outbreak indicators',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Laboratory Data Integration
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered lab report analysis with automatic MDR pathogen detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-blue-500 text-blue-600 px-3 py-1">
            <Brain className="w-3 h-3 mr-2" />
            NLP Engine Active
          </Badge>
        </div>
      </div>

      {/* Processing Status Banner */}
      {isProcessing && (
        <Card className="border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg animate-spin">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Processing Lab Report...
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Analyzing organisms and resistance patterns
                  </p>
                </div>
                <span className="text-2xl font-bold text-blue-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detection Results */}
      {detectedPathogens.length > 0 && !isProcessing && (
        <Card className="border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500 rounded-xl shadow-lg shadow-red-500/30">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 dark:text-red-100 text-lg mb-2">
                  MDR Organisms Detected
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {detectedPathogens.map((pathogen, idx) => (
                    <Badge key={idx} className="bg-red-500 text-white text-sm px-3 py-1">
                      🦠 {pathogen}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Patient automatically flagged for isolation. Contact tracing initiated. Infection control team notified.
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Upload Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* CSV Upload Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              Bulk CSV Upload
            </CardTitle>
            <CardDescription>Upload multiple lab results in CSV format for batch processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 hover:border-primary transition-all cursor-pointer group">
              <div className="mb-4 inline-block p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Drop CSV file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports .csv, .xlsx files up to 10MB
              </p>
              <Button className="mt-2" variant="outline" size="lg">
                <FileText className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>

            {/* CSV Format Guide */}
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="text-xs font-semibold text-foreground mb-2">Required CSV Columns:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>• Patient ID</div>
                <div>• Specimen Type</div>
                <div>• Organism Name</div>
                <div>• Resistance Markers</div>
              </div>
            </div>

            <Button 
              onClick={handleUpload} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" 
              size="lg"
              disabled={isProcessing}
            >
              <Zap className="w-4 h-4 mr-2" />
              Process Batch Upload
            </Button>
          </CardContent>
        </Card>

        {/* Text Input Card */}
        <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Direct Text Input
            </CardTitle>
            <CardDescription>Paste lab report text for instant NLP-powered analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Paste lab report text here...&#10;&#10;Example:&#10;Patient ID: P-10234&#10;Specimen: Blood Culture&#10;Organism: Staphylococcus aureus - Methicillin Resistant"
                className="min-h-[280px] font-mono text-sm bg-muted/30 focus:bg-background transition-colors"
                value={labText}
                onChange={(e) => setLabText(e.target.value)}
              />
              {labText.length > 0 && (
                <Badge variant="secondary" className="absolute bottom-3 right-3">
                  {labText.length} characters
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={fillSampleData}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
              <Button
                onClick={() => setLabText('')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Clear
              </Button>
            </div>

            <Button 
              onClick={handleTextProcess} 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white" 
              size="lg"
              disabled={isProcessing || !labText.trim()}
            >
              <FlaskConical className="w-4 h-4 mr-2" />
              Process Lab Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>System Capabilities</CardTitle>
          <CardDescription>Advanced features powering intelligent MDR detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemCapabilities.map((capability, idx) => (
              <div 
                key={idx}
                className="p-5 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <capability.icon className={`w-8 h-8 ${capability.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold text-foreground mb-1 text-sm">{capability.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MDR Detection Database */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-primary" />
            MDR Pathogen Detection Library
          </CardTitle>
          <CardDescription>Automatically detects these multidrug-resistant organisms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mdrPathogens.map((pathogen, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl bg-gradient-to-br ${pathogen.color} text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {pathogen.icon}
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {pathogen.prevalence}
                  </Badge>
                </div>
                <h3 className="font-bold text-xl mb-2">{pathogen.name}</h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {pathogen.fullName}
                </p>
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-xs text-white/80">
                    Auto-flagged for isolation protocol
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Processing Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Processing Activity</CardTitle>
          <CardDescription>Last 5 lab reports analyzed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2m ago', patient: 'P-10234', result: 'MRSA Detected', severity: 'critical' },
              { time: '15m ago', patient: 'P-10236', result: 'MRSA Detected', severity: 'critical' },
              { time: '1h ago', patient: 'P-10240', result: 'VRE Detected', severity: 'high' },
              { time: '2h ago', patient: 'P-10235', result: 'No MDR', severity: 'low' },
              { time: '3h ago', patient: 'P-10238', result: 'MRSA Detected', severity: 'critical' }
            ].map((activity, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                    activity.severity === 'high' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-foreground">{activity.patient}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge 
                  className={
                    activity.severity === 'critical' ? 'bg-red-500 text-white' :
                    activity.severity === 'high' ? 'bg-orange-500 text-white' :
                    'bg-green-500 text-white'
                  }
                >
                  {activity.result}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabIngest;