export interface IProduct {
    id: number;
    descricao: string;
    fornecedor: number | null;
    nome: string;
    categoria: string;
    material: string;
    departamento: string;
    preco: number;
    descricaoPreco: 'No pix';
    quantidadeEstoque: 10;
    imagem: string;
}