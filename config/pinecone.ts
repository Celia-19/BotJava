/**
 * Cambia el espacio de nombres al espacio de nombres en Pinecone donde te gustaría almacenar tus incrustaciones
 */

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Falta el nombre del índice de Pinecone en el archivo .env.');
}

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';


const PINECONE_NAME_SPACE = 'documentos'; //El espacio de nombres es opcional para tus vectores.

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };
