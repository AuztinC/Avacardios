const client=require('./client');
const {v4}=require('uuid');
const uuidv4=v4

const fetchReviews=async()=>{
    const SQL=`SELECT * FROM REVIEWS`;
    const responde=await client.query(SQL);
    return responde.rows;
}

const createReviews=async(review)=>{

    const SQL='INSERT INTO reviews(id,username,product_id,stars,body) VALUES($1,$2,$3,$4,$5) RETURNING *'
    const response=await client.query(SQL,[uuidv4(), review.username, review.product_id, review.stars, review.body])

    return response.rows[0];
}

module.exports={
    fetchReviews,
    createReviews
}