import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FlaskConical, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const LabIngest = () => {
  const [labText, setLabText] = useState('');

  const handleUpload = () => {
    toast.success('Lab results parsed successfully! MDR organisms detected.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Lab Results Ingest</h1>
        <p className="text-muted-foreground mt-1">Upload or paste lab reports for automatic MDR detection</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
            <CardDescription>Upload lab results in CSV format</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-accent/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground mb-2">Drop CSV file here or click to browse</p>
              <p className="text-xs text-muted-foreground">Accepts .csv files up to 10MB</p>
              <Button className="mt-4" variant="outline">
                Select File
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paste Lab Report</CardTitle>
            <CardDescription>Or paste lab report text directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste lab report text here...&#10;&#10;Example:&#10;Patient: John Anderson&#10;Specimen: Blood Culture&#10;Organism: Staphylococcus aureus - Methicillin Resistant (MRSA)"
              className="min-h-[200px] font-mono text-sm"
              value={labText}
              onChange={(e) => setLabText(e.target.value)}
            />
            <Button onClick={handleUpload} className="w-full">
              <FlaskConical className="w-4 h-4 mr-2" />
              Process Lab Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>NLP Detection Capabilities</CardTitle>
          <CardDescription>Automatically detects these MDR pathogens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-1">MRSA</h3>
              <p className="text-xs text-muted-foreground">Methicillin-resistant Staphylococcus aureus</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-1">VRE</h3>
              <p className="text-xs text-muted-foreground">Vancomycin-resistant Enterococcus</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-1">ESBL</h3>
              <p className="text-xs text-muted-foreground">Extended-spectrum beta-lactamase</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-foreground mb-1">CRE</h3>
              <p className="text-xs text-muted-foreground">Carbapenem-resistant Enterobacteriaceae</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabIngest;
