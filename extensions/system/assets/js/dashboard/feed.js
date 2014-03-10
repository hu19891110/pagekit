require(["jquery", "tmpl!feed.list", "goog!feeds,1", "domReady!"], function($, tmpl) {

    $("[data-feed]").each(function() {

        var widget = $(this), config = widget.data("feed"), feed = new google.feeds.Feed(config.url);

        feed.setNumEntries(config.count);

        feed.load(function(result) {

            if (!result.error) {

                var items = [];

                $.each(result.feed.entries, function(key, entry) {
                    var withText = false;
                    if ((config.content == 1) || (config.content == 2 && key === 0)) {
                        withText = true;
                    }

                    var item = {
                        link: entry.link,
                        title: entry.title,
                        publishedDate: new Date(entry.publishedDate).toLocaleDateString(),
                        content: (withText) ? entry.contentSnippet : null
                    }

                    items.push(item);
                });

                widget.replaceWith(tmpl.render('feed.list', {items: items}));
            }

        });
    });
});