$(document).ready(function () {
    // haetaan data
    fetch = () => {
        var combined = "http://127.0.0.1:3002/Asiakas?" + $("form").serialize();
        $("#osoite").text(combined);
        $.get({
            url: combined,
            success: (result) => {
                showResultInTable(result);
            }
        });
    }

    $('#addCustSubmit').click(() => {
        let param = $("form").serialize();
        addCust(param);
    });

    // tekee post-kutsun palvelimelle ja vastauksen saatuaan jatkaa
    addCust = (param) => {
        $.post("http://127.0.0.1:3002/Asiakas", param)
        fetch();
    };

    // bindataan click-event
    $('#searchBtn').click(() => {
        fetch();
    });
    
    poista = (key) => {
        $.ajax({
            url: 'http://localhost:3002/Asiakas/' + key, 
            type: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                fetch();
                console.log(result);
            },
            error: function (ajaxContext) {
                
                alert(ajaxContext.responseText)
            }
        });
    }
    
});

// Tuo haun tuloksen table-elementtiin. Jotain kannattaa tehdä, jotta taulukkoon ei tulisi samat tiedot
showResultInTable = (result) => {
    result.forEach(element => {
        let trstr = "<tr><td>" + element.NIMI + "</td>\n";
        trstr += "<td>" + element.OSOITE + "</td>\n";
        trstr += "<td>" + element.POSTINRO + "</td>\n";
        trstr += "<td>" + element.POSTITMP + "</td>\n";
        trstr += "<td>" + element.ASTY_AVAIN + "</td>";
        trstr += `<td><button onclick="poista(${element.AVAIN});" class="deleteBtn">Poista</button></td>`;
        trstr += "</tr>\n";
        $('#data tbody').append(trstr);
    });
}