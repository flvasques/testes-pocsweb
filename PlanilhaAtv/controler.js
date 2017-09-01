var vetorAtividades = localStorage.getItem('vetorAtividades') != null ? JSON.parse(localStorage.getItem('vetorAtividades')) : [];
var timer = null;
window.onunload = function(){
	if(vetorAtividades.length > 0){
		localStorage.setItem('vetorAtividades', JSON.stringify(vetorAtividades));
	}
}
/*
{
	nome: '',
	inicio: Date(),
	fim: Date(),
	tempo: milis,
	finalizado: true  - false - pause
}
*/
function addAtv(){
	localStorage.clear();
	vetorAtividades.push({
		nome: document.getElementById('tituloAtividade').value,
		inicio: new Date(),
		tempo: 0,
		fim: null,
		finalizado: 'false'
	});
	document.getElementById('add').remove();
	addLinha(vetorAtividades.length - 1);
	novo();
	if (vetorAtividades.length == 1) {
		setInterval('incrementarTempo()',1000);
	}
	localStorage.setItem('vetorAtividades', JSON.stringify(vetorAtividades));
}
function addLinha(i){

	var tr = document.createElement('tr');

	var tdTitulo = document.createElement('td');
	tdTitulo.innerHTML = vetorAtividades[i].nome;

	var tdHoraInicio = document.createElement('td');
	var atual = new Date(vetorAtividades[i].inicio);
	var inicio = document.createElement('label');
	inicio.setAttribute('type','text');
	inicio.setAttribute('size','5');
	inicio.setAttribute('id',"inicio"+i);
	inicio.setAttribute('onchange','acertar('+i+')');
	inicio.innerHTML = (atual.getHours() < 10 ?  '0' + atual.getHours() : atual.getHours()) + ":" + (atual.getMinutes() < 10 ?  '0' + atual.getMinutes() : atual.getMinutes());
	tdHoraInicio.appendChild(inicio);


	var tdAcoes = document.createElement('td');
	tdAcoes.setAttribute('id','acoes'+i);

	var pTempo = document.createElement('label');
	pTempo.setAttribute('id','decorrido'+i);
	pTempo.innerHTML = formatHora(vetorAtividades[i].tempo);
	tdAcoes.appendChild(pTempo);

	var btnPause = document.createElement('button');
	btnPause.setAttribute('id','pausa'+i);
	btnPause.setAttribute('onclick', 'pausar('+i+')');
	btnPause.innerHTML = 'Pause';
	tdAcoes.appendChild(btnPause);

	var btnFim = document.createElement('button');
	btnFim.setAttribute('id','cmd'+i)
	btnFim.setAttribute('onclick','finalizar('+i+')');
	btnFim.innerHTML = 'Finalizar';
	tdAcoes.appendChild(btnFim);

	tr.appendChild(tdTitulo);
	tr.appendChild(tdHoraInicio);
	tr.appendChild(tdAcoes);
	document.getElementById('itens').appendChild(tr);
}	
function novo(){
	var tr = document.createElement('tr');
	tr.setAttribute('id','add');

	var tdCampo = document.createElement('td');
	tdCampo.setAttribute('colspan', '2');
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id','tituloAtividade');
	tdCampo.appendChild(input);

	var tdBtn = document.createElement('td');
	var btn = document.createElement('button');
	btn.setAttribute('onclick','addAtv()');
	btn.setAttribute('title','Nova Atividade');
	btn.innerHTML = 'Adcionar';
	tdBtn.appendChild(btn);
	tr.appendChild(tdCampo);
	tr.appendChild(tdBtn);
	document.getElementById('itens').appendChild(tr);
	document.getElementById('tituloAtividade').focus();

}

function finalizar(e){
	vetorAtividades[e].finalizado = 'true';
	var agora = new Date(); 
	var horaFinal = agora.getHours() + ':' + (agora.getMinutes() < 10 ?  '0' + agora.getMinutes() : agora.getMinutes()); 
	vetorAtividades[e].fim = horaFinal;

	document.getElementById('decorrido'+e).remove();
	document.getElementById('cmd'+e).remove();
	document.getElementById('pausa'+e).remove();
	var label = document.createElement('label');
	label.innerHTML = horaFinal + '&nbsp&nbsp-&nbsp&nbsp' + formatHora(vetorAtividades[e].tempo);
	document.getElementById('acoes'+e).appendChild(label);
}

function incrementarTempo(){
	for ( var i = 0; i < vetorAtividades.length; i++ ){
		if(vetorAtividades[i].finalizado == 'false'){
			vetorAtividades[i].tempo++;
			document.getElementById('decorrido'+i).innerHTML = formatHora(vetorAtividades[i].tempo);
		}
	}
}

function formatHora(tempo){
	var segundos = tempo % 60;
	var minutos = Math.floor(tempo / 60) % 60;
	var horas = Math.floor(tempo / 3600);
	return (horas < 10 ? '0' + horas : horas) + ':' + (minutos < 10 ? '0' + minutos : minutos) + ':' + (segundos < 10 ? '0' + segundos : segundos);
}
function pausar(e){
	if(vetorAtividades[e].finalizado == 'false'){
		vetorAtividades[e].finalizado = 'pause';
		document.getElementById('pausa'+e).innerHTML = 'Play';
	}else{
		vetorAtividades[e].finalizado = 'false';
		document.getElementById('pausa'+e).innerHTML = 'Pause';
	}

}
function carregar(){
	if(vetorAtividades.length > 0){
		for ( var i = 0; i < vetorAtividades.length; i++ ) {
			addLinha(i);
			pausar(i);
		}
		setInterval('incrementarTempo()',1000);
		document.getElementById('add').remove();
		novo();		
	}
}
function apagar(){
	localStorage.clear();
}
function addcusto(){

}
function calcularCusto(v){
	
}
function nomearCusto(e){
	
}	
function valorAnterior(v){

}