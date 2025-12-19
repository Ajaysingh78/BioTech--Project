import axios from 'axios';



class AIAgent {
  constructor() {
    this.apiKey = process.env.AGENT_KEY;
    this.apiEndpoint =
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';
  }

  async analyzePatient(patientData) {
    const prompt = this.buildAnalysisPrompt(patientData);

    try {
      const response = await axios.post(
        `${this.apiEndpoint}?key=${this.apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: 2048
          }
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000
        }
      );

      const rawText =
        response.data?.candidates?.[0]?.content?.parts
          ?.map(p => p.text)
          .join('\n') || '';

      return this.parseAnalysis(rawText);
    } catch (error) {
      console.error(
        'AI Analysis Error:',
        error.response?.data || error.message
      );
      throw new Error('Failed to analyze patient data');
    }
  }

  buildAnalysisPrompt(patientData) {
    return `
You are a healthcare AI engine.

STRICT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanations
- NO greetings
- NO disclaimers

PATIENT DATA:
${JSON.stringify(patientData, null, 2)}

REQUIRED JSON FORMAT:
{
  "infectionStatus": "INFECTED|NOT_INFECTED|HIGH_RISK|MONITORING_REQUIRED",
  "confidence": "0-100%",
  "executiveSummary": "",
  "severity": "MILD|MODERATE|SEVERE|CRITICAL",
  "alerts": [],
  "recommendations": []
}
`;
  }

  parseAnalysis(text) {
    try {
      // Remove ```json ``` if Gemini adds it
      const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleaned);
    } catch (err) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid AI response format');
    }
  }
}

const aiAgent = new AIAgent();
export default aiAgent;
