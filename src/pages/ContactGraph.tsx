import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPatients, mockContacts } from '@/data/mockData';
import { Network, User, Users, Radio } from 'lucide-react';

const ContactGraph = () => {
  // Get high-risk patient for graph visualization
  const highRiskPatient = mockPatients.find(p => p.riskScore >= 70);
  const relatedContacts = mockContacts.filter(c => c.targetPatientId === highRiskPatient?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Graph Viewer</h1>
        <p className="text-muted-foreground mt-1">Interactive visualization of patient contact networks</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Graph Visualization (Placeholder) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contact Network</CardTitle>
            <CardDescription>
              Showing contacts for {highRiskPatient?.name} ({highRiskPatient?.id})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/30 rounded-lg p-8 min-h-[500px] flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-4">
                <Network className="w-16 h-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Interactive Graph Visualization</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    In production, this would display an interactive graph using Cytoscape.js or Vis.js
                    showing patient nodes, staff nodes, and device nodes with time-based contact edges.
                  </p>
                </div>
                {highRiskPatient && (
                  <div className="mt-6 p-4 bg-card rounded-lg border inline-block">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-destructive" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{highRiskPatient.name}</p>
                        <Badge className="bg-destructive text-destructive-foreground mt-1">
                          Risk: {highRiskPatient.riskScore}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Central node with {relatedContacts.length} direct contacts
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Network Statistics</CardTitle>
            <CardDescription>Contact analysis summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Direct Contacts</span>
                </div>
                <span className="text-xl font-bold">{relatedContacts.length}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Staff Exposed</span>
                </div>
                <span className="text-xl font-bold">
                  {relatedContacts.filter(c => c.sourceType === 'staff').length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Devices</span>
                </div>
                <span className="text-xl font-bold">
                  {relatedContacts.filter(c => c.sourceType === 'device').length}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-foreground mb-3">Recent Contacts</h4>
              <div className="space-y-3">
                {relatedContacts.slice(0, 4).map((contact) => (
                  <div key={contact.id} className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {contact.sourceType === 'staff' && <User className="w-4 h-4 text-muted-foreground" />}
                      {contact.sourceType === 'device' && <Radio className="w-4 h-4 text-muted-foreground" />}
                      <p className="text-sm font-medium text-foreground">{contact.sourceName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{contact.sourceType}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${contact.proximityScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{contact.proximityScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Graph Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/20 border-2 border-destructive flex items-center justify-center">
                <User className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Patient</p>
                <p className="text-xs text-muted-foreground">High-risk MDR-positive</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Staff</p>
                <p className="text-xs text-muted-foreground">Healthcare personnel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent border-2 border-border flex items-center justify-center">
                <Radio className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Device</p>
                <p className="text-xs text-muted-foreground">Equipment & IoT tags</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactGraph;
