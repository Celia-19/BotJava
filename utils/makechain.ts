import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

// Dada la siguiente conversación y una pregunta de seguimiento, reformula la pregunta de seguimiento para que sea una pregunta independiente.
const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `Eres un asistente de inteligencia artificial útil. Utiliza los siguientes fragmentos de contexto para responder la pregunta al final.
Si no conoces la respuesta, simplemente di que no lo sabes. NO intentes inventar una respuesta.
Si la pregunta no está relacionada con el contexto, responde cortésmente que estás configurado para responder solo preguntas relacionadas con el contexto.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0, // Aumenta la temperatura para obtener respuestas más creativas
    modelName: 'gpt-3.5-turbo', //Tipo de modelo
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //El número de documentos fuente devueltos es 4 de manera predeterminada.
    },
  );
  return chain;
};
