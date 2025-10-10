import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPatients, mockContacts, mockLabResults } from '@/data/mockData';
import { Search, User, Calendar, MapPin, Activity, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const patientContacts = mockContacts.filter(c => c.targetPatientId === selectedPatient.id);
  const patientLabs = mockLabResults.filter(l => l.patientId === selectedPatient.id);

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-warning';
    return 'text-success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'monitoring': return 'bg-warning text-warning-foreground';
      case 'stable': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Patient Tracker</h1>
        <p className="text-muted-foreground mt-1">Monitor patient movements and contact history</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Search</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedPatient.id === patient.id
                      ? 'bg-primary/10 border-primary'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium text-foreground">{patient.name}</p>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{patient.id}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{patient.currentWard}</p>
                    <p className={`text-sm font-semibold ${getRiskColor(patient.riskScore)}`}>
                      Risk: {patient.riskScore}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{selectedPatient.name}</CardTitle>
                  <CardDescription className="mt-1">{selectedPatient.id} • DOB: {selectedPatient.dob}</CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getRiskColor(selectedPatient.riskScore)}`}>
                    {selectedPatient.riskScore}
                  </div>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="font-medium text-foreground">{selectedPatient.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ward</p>
                    <p className="font-medium text-foreground">{selectedPatient.currentWard}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Admission ID</p>
                    <p className="font-medium text-foreground">{selectedPatient.admissionId}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  onClick={() => navigate('/contacts')}
                  className="w-full"
                >
                  <Network className="w-4 h-4 mr-2" />
                  View Full Contact Graph
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lab Results */}
          {patientLabs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>Recent laboratory findings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientLabs.map((lab) => (
                    <div key={lab.id} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{lab.organism}</p>
                          <p className="text-sm text-muted-foreground">{lab.specimenType}</p>
                        </div>
                        <Badge className="bg-destructive text-destructive-foreground">
                          {lab.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {lab.resistanceFlags.map((flag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-destructive/50">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{formatDateTime(lab.timestamp)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Timeline</CardTitle>
              <CardDescription>Recent interactions and exposure events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientContacts.map((contact) => (
                  <div key={contact.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="w-0.5 h-full bg-border" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-medium text-foreground">{contact.sourceName}</p>
                          <p className="text-sm text-muted-foreground capitalize">{contact.sourceType}</p>
                        </div>
                        <Badge variant="outline">{Math.floor(contact.durationSeconds / 60)} min</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{contact.location}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(contact.startTime)}</p>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${contact.proximityScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{contact.proximityScore}% proximity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientTracker;
