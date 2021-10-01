//***********************************************************************************************************
//*                                         *ASCIILogosTestGen.js*                                          *
//*                 This JS file generates the test for the figlet logos which                              *
//*                 are shown in the startup of the game                                                    *
//*                                                                                                         *
//*                 WORKING: It exports the tests in a java class, located in                               *
//*                            .../test/java/ASCIILogosTest.java                                            *
//*                          The output is shown in the console and then piped to the file,which is deleted *
//*                          before to prevent appending to itself.                                         *
//*                                                                                                         *
//*                 LIBRARIES: uses the figlet.js library, link: https://github.com/patorjk/figlet.js       *
//*                                                                                                         *
//*                 Thanks :  Patrick Gillespie(https://github.com/patorjk/) and other contributors :D      *
//*                                                                                                         *
//*                 Run : do npm run genTests to generate the tests.                                        *
//***********************************************************************************************************


var figlet = require('figlet');

var header = `

//*******************************************************************************************
//*                         *AsciiLogosTest.java*                                           *
//*             ⚠ ⚠       !! DO NOT EDIT THIS FILE !!     ⚠⚠                                *
//*     This file is AUTOMATICALLY GENERATED by ASCIILogoGen/ASCIILogosTestGen.js           *
//*     please see the aforementioned file to edit this code!!                              *
//*     These are the tests for the ascii logos shown in                                    *
//*     the startup of the game.                                                            *
//*                                                                                         *
//*     source : https://www.patorjk.com/software/taag/#p=testall&font=Wet%20Letter&t=ludus *
//*                                                                                         *
//*                                                 ~ Generated from ASCIILogosTestGen.js   *
//*******************************************************************************************

import org.junit.*;
import com.ludus.ASCIILogos;
public class ASCIILogosTest{
`;



var end = `
}
`;



// print the initial Code of the file
console.log(header);
//print the fonts,as Java enum values:

figlet.fonts(
  	function(err, fonts) {
   		if (err) {
   			console.log('Some Error Occurred While loading the fonts:');
   			console.dir(err);
   			return;
   		}
   		fonts.forEach(
   			function(font){
   				figlet.text('Ludus', {
   					font: font,
   					horizontalLayout: 'default',
   					verticalLayout: 'default',
				    width: 180,
			    	whitespaceBreak: true
		    	},
	    			function(err, data) {
    					if (err) {
   							console.log('Something went wrong While using the fonts');
						    console.dir(err);
					    	return;
				    	}

				        var varName = font.toString().toUpperCase().replace(/ /g,"_").replace(/3/g,"THREE").replace(/4/g,"FOUR").replace(/2/g,"TWO").replace(/1/g,"ONE").replace(/6/g,"SIX").replace(/5/g,"FIVE")/* some fonts start with numbers :( */ .replace(/-/g,"_").replace(/\'/g,""); //some have - :( the /g is regex for replace all occurences, apparently js has native regex syntax?

				    	var varVal = (data.toString().replace(/\\/g,"\\\\").replace(/\"/g , "\\\""));

                        var func = `
@Test
public void Test${varName}()
{
    String expected = """
${varVal}""";
    Assert.assertEquals(expected,ASCIILogos.${varName}.getVal());
}
`


		    			console.log(func);

		    			});
    		});
   	});
// wait for the figlet.js to print all the tests and then print the ending of the enum.

const timer = ms => new Promise( res => setTimeout(res, ms));
timer(3000).then(_=>console.log(end));      // should take abt 3 seconds.