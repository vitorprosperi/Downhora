import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function telaDireitos() {
    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView>
                <Text style={styles.title}>Avaliação nutricional de crianças e adolescentes com síndrome de Down</Text>
                <View>
                    <Text>
                        É fundamental utilizar curvas de crescimento específicas para crianças e adolescentes com Síndrome de Down,
                        pois quando usamos as curvas de crescimento da população em geral, podemos ter interpretações equivocadas,
                        como achar que a criança está menor do que deveria para a idade ou que está com peso acima do esperado.
                    </Text>
                    <Text>
                        As curvas específicas levam em conta as características próprias do crescimento de pessoas com Síndrome de Down,
                        permitindo uma avaliação adequada e real da estatura, do peso e do desenvolvimento ao longo dos anos.
                        Assim, pais e profissionais de saúde conseguem acompanhar a criança de maneira mais apropriada, identificar precocemente
                        qualquer alteração e planejar os cuidados necessários para proporcionar uma vida mais saudável.
                    </Text>
                </View>
                <View>
                    <Text>15 passos para uma alimentação saudável de crianças com síndrome de Down</Text>
                    <Text>Aleitamento materno exclusivo até os 6 meses de idade;</Text>
                    <Text>Oferecer o leite materno como complemento até 2 anos de idade ou mais;</Text>
                    <Text>A introdução dos alimentos deve começar somente quando o pediatra orientar e quando a criança mostrar que já está pronta.</Text>
                    <Text>A alimentação da família também deve ser introduzida respeitando o desenvolvimento da criança;</Text>
                    <Text>Não é necessário adicionar sal na comida da criança até 1 ano de idade e açúcar até os 2 anos de idade;</Text>
                    <Text>É PROIBIDO o consumo de mel até os dois anos de idade;</Text>
                    <Text>Oferecer legumes, frutas e verduras diariamente;</Text>
                    <Text>Oferecer água à criança várias vezes ao dia;</Text>
                    <Text>
                        Não oferecer sucos, mesmo que naturais aos menores de 1 ano. Além disso, os sucos devem limitar a quantidade máxima de 120 mL/dia,
                        para crianças de 1 a 3 anos e de 175mL/dia, para crianças de 4 a 6 anos e 250ml a partir dos 7 anos.
                    </Text>
                    <Text>
                        Evitar embutidos (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
                        bebidas açucaradas (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e ultraprocessados
                        (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
                    </Text>
                    <Text>Não permitir distrações como telas durante as refeições;</Text>
                    <Text>Dar atenção aos sinais de fome e saciedade da criança e conversar com ela durante a refeição;</Text>
                    <Text>Os bons hábitos alimentares da família são fundamentais para que a criança se alimente bem!</Text>
                    <Text>
                        Permita que a criança explore os alimentos: tocar, apertar e cheirar faz parte da experiência de comer!
                        Além disso, incentive sempre a experimentar novos sabores e texturas.
                    </Text>
                    <Text>Proteja as crianças da publicidade de alimentos.</Text>
                </View>
                <View>
                    <Text>15 passos para uma alimentação saudável de adolescentes com síndrome de Down</Text>
                    <Text>Coma frutas, legumes e verduras diariamente;</Text>
                    <Text>Tome água várias vezes ao dia;</Text>
                    <Text>
                        Evite o consumo de embutidos (presunto, mortadela, salsicha, linguiça, peito de peru, salame, nuggets, hambúrgueres),
                        bebidas açucaradas (refrigerante, suco em pó, achocolatados prontos, bebida lácteas com sabor) e ultraprocessados
                        (salgadinho, bolachas com e sem recheio, salgadinhos, chocolate, doces, etc);
                    </Text>
                    <Text>Não pule refeições! É importante comer várias vezes ao dia (café da manhã, almoço, jantar e lanches entre as refeições principais);</Text>
                    <Text>Tome café da manhã, pois essa é uma das refeições mais importantes do dia!</Text>
                    <Text>Evite o consumo de fast food;</Text>
                    <Text>Limite a ingestão de suco, mesmo que natural, à 240ml por dia;</Text>
                    <Text>Evite frituras (prefira os alimentos cozidos, assados, grelhados);</Text>
                    <Text>Consuma fontes de cálcio (leite, derivados, vegetais verdes escuro), pois esse mineral é fundamental na formação dos ossos e dentes;</Text>
                    <Text>O consumo adequado de carboidratos (arroz, pães, mandioca, batata, etc) é fundamental, pois é principal fonte de energia do corpo;</Text>
                    <Text>O consumo adequado de proteína (feijão, lentilha, ervilha, grão-de-bico, ovos, carnes, peixes, etc) é fundamental, pois auxiliam no crescimento, desenvolvimento dos músculos e fortalecimento do corpo;</Text>
                    <Text>Consuma sal, açúcar, óleos e gorduras com moderação;</Text>
                    <Text>Não troque a comida por lanches;</Text>
                    <Text>Durma bem;</Text>
                    <Text>Leia o rótulo dos alimentos sempre!</Text>
                </View>
                <View>
                    <Text>Classificação dos alimentos quanto ao grau de processamento</Text>
                    <Text>In natura: alimentos obtidos diretamente de plantas ou animais (ex.: folhas, frutos, ovos, leite)</Text>
                    <Text>
                        Minimamente processados: alimentos que passaram por pequenas alterações (ex.: arroz, feijão, farinhas, carnes resfriadas,
                        raízes e tubérculos lavados, couve picada, leite pasteurizado)
                    </Text>
                    <Text>
                        Processados: alimentos com adição de sal, açúcar ou gordura (ex.: frutas em calda,
                        legumes em conserva, peixes em conserva, carne seca, pães, queijos)
                    </Text>
                    <Text>
                        Ultraprocessados: produtos que passam por diversas etapas de processamento e vários geralmente possuem vários ingredientes
                        (ex.: salgadinho, bolacha, macarrão instantâneo)
                    </Text>
                    <Text>Pensando na analogia dos grupos alimentares com um semáforo, temos:</Text>
                    <Text>Verde – alimentos in natura e minimamente processados: podem ser consumidos em maiores quantidades.</Text>
                    <Text>Amarelo – alimentos processados: indicam que o consumo deve ser moderado.</Text>
                    <Text>Vermelho – alimentos ultraprocessados: devem ser evitados sempre que possível.</Text>
                    <Text>Essa analogia ajuda a entender de forma simples quais alimentos podem ser consumidos mais, com moderação ou evitados.</Text>
                    <View>
                        <Text>Como ler o rótulo dos alimentos?</Text>
                        <Text>
                            A lista de ingredientes é organizada da maior para a menor quantidade. O primeiro ingrediente é o que tem mais, e o último,
                            o que tem menos. Listas longas e/ou com nomes difíceis podem indicar que o alimento é ultraprocessado.
                        </Text>
                        <Text>
                            Evite alimentos que tenham no rótulo frontal avisos como “alto em açúcares adicionados”,
                            “alto em sódio” ou “alto em gordura saturada”.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});