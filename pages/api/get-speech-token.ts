import { NextRequest,NextResponse } from 'next/server'
import axios from 'axios'

export default async function gst(req: NextRequest,res:any){
    const speechKey = process.env.SPEECH_KEY;
    const speechRegion = process.env.SPEECH_REGION;

    
        const headers = { 
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } as any;

        try {
            const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
            res.json({ token: tokenResponse.data, region: speechRegion });
        } catch (err) {
            res.json({error: 'There was an error authorizing your speech key.'});
        }

}