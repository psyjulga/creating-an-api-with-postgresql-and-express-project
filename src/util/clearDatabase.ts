import client from '../database'

const clearDatabase = async (myquery: string): Promise<void> => {
	try {
		const conn = await client.connect()
		const res = await conn.query(myquery)
		conn.release()
	} catch (e) {
		throw new Error(`Error in clearDatabase(): ${e}`)
	}
}

export default clearDatabase
