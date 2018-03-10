var TelegramBot = require('node-telegram-bot-api'),
    Cron = require('cron').CronJob,
    request = require('request'),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    token = '512961337:AAFZZPKb14seQ2bZ3g9p_XipAJfqWxQnYlw';
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('4f49388f6ba549bf8bff5bac87a26c99');



//bot.on это npm пакет "node-telegram-bot-api" который отправляет сообщения на указаный айдишник 
  
   url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4f49388f6ba549bf8bff5bac87a26c99';
   var job = new Cron('*/2 * * * *', function() {

     request(url, function(error, response, body) {
      var sourcesLink = ["abc-news", "bbc-news", "associated-press", "bbc-sport", "bloomberg", "cbs-news", "breitbart-news", "cnbc", "crypto-coins-news", "daily-mail", "cnn", "engadget", "entertainment-weekly", "espn", "financial-post", "fortune", "fox-news", "fox-sports", "google-news-ru", "hacker-news", "independent", "lenta", "mtv-news", "nbc-news", "news24", "the-economist", "the-washington-post", "nbc-news"];
      var rand = Math.floor(Math.random() * sourcesLink.length);
      var randLink ;
      randLink = sourcesLink[rand];

    newsapi.v2.everything({

      from: '2018-01-01',
      to: '2018-03-04',
      sources:`${randLink}`,
      page: 1,
      pageSize:1,

            }).then(response => {
                let output = '';
                let outputTitle = '';
                let outputDescript = '';
                let outputUrl = '';
                  
                  for (news of response.articles) {
                     outputTitle += news.title + '\n';
                  }

                  for (news of response.articles) {
                     outputUrl += news.url + '\n';
                  }

                   output = outputTitle + ' ' + outputUrl;
                  //Айдишник на который отправляються новост, его нужно заменить на айдишник любого зашедшего юзера 
                  
                   
                      var chatId = -1001190481848;
                       bot.sendMessage(chatId, entities.decode(output));
                       console.log(output);
                  bot.on('message', function(msg) {
                    
                     /*var id = msg.from.id;*/

                     /*bot.sendMessage(id, msg.text);
                     console.log(msg);*/
                    });  
                });

          });
    });
  
  job.start();
