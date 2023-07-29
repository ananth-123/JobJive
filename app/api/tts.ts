import axios from 'axios';
import { NextRequest,NextResponse } from 'next/server'


export default async function tts(req: NextRequest,res: NextResponse){
    try{
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${req.body.voiceid}`,
            {
              'text': 'string',
              'model_id': 'eleven_monolingual_v1', // or you can change to monolingual v4
              'voice_settings': {
                'stability': 0.5,
                'similarity_boost': 0.5
              }
            },
            {
              headers: {
                'accept': 'audio/mpeg',
                'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
                'Content-Type': 'application/json'
              }
            }
          );
          return res.status(200).json({
            message: "Success",
            response,
          });
    }
    catch(e){
        res.status(500).send({
            success:false,
            message: e.tostring()
        });
    }
}