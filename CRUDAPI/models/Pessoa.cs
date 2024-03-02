// Rafael Hassegawa - 26/02/2024

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDAPI.models
{
    public class Pessoa
    {
        public int PessoaId { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public int Idade { get; set; }
        public string Profissao { get; set; }

        public Pessoa()
        {
            Nome = "";
            Sobrenome = "";
            Idade = 0;
            Profissao = "";
        }

    }
}