import { CarModel } from "../models/car-models";
import { database } from "../repository/cars-repository";
import { Request, Response } from "express";

export const getCars = async (req: Request, res: Response)  => {//////////////GET
    return res.json(database);
};


export const createCar = async (req: Request, res: Response) => {///////////////////POST

    const newCar: CarModel = req.body; //contém os dados que o cliente enviou na requisição para criar o carro (deve ser um objeto com os campos do CarModel).
    database.push(newCar); //adiciona esse novo carro no array database
    return res.status(201).json(newCar); //envia o carro criado de volta para o cliente com o status HTTP
}


export const deleteCar = (req: Request, res: Response) => {//////////////////DELETE

    const id = Number(req.params.id); 
    //converte o id que vem como string na URL para número.

    const index = database.findIndex(car => car.id === id); 
    //busca o índice do carro que tem esse id no array.

    if(index !== -1){ //Se encontrar (index !== -1), usa splice para remover o carro do array.
        database.splice(index, 1);
        return res.status(200).send({ message: "Carro deletado com sucesso" });
    }
    else{
        return res.status(404).json({ message: "Carro não encontrado" });
    }
}

export const updateCar = (req: Request, res: Response) => {/////////////PATCH
    const id = Number(req.params.id);
    //Extrai o id que veio na URL e converte para number.
    //params.id sempre vem como string, então o Number() é para comparar corretamente com o id(number) do banco de dados.
    
    
    const index = database.findIndex(car => car.id === id); 
    //busca o índice do carro que tem esse id no array.

    if (index !== -1) {
        const updatedCar: CarModel = { ...database[index], ...req.body };
        //É usado o spread operator (...) para criar 
        //um novo objeto, mesclando os dados antigos com os novos:
        
        
        database[index] = updatedCar;
        //Substitui o carro antigo no banco com o novo carro atualizado.
        
        return res.json(updatedCar);
        //Retorna o novo objeto como resposta da requisição.
        
    } else {
        return res.status(404).json({ message: "Carro não encontrado" });
    }
};
