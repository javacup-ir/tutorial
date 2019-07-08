# فصل دوم _ مفاهیم اولیه زبان جاوا

## مقدمه
یکی از قابلیت های درونی کتابخانه Spring
امکان ارسال event های
داخلی است که بتوان یک یا چند subscriber روی آن تعریف کرد.

با اینکار میتوان بدون تغییر قسمت زیادی از کد روی یک مرحله خاصی از کار که یک Event رخ میدهد
کد جدید اضافه کرد و به انجام کاری پرداخت.


## توضیح مثال
در این مثال یک event به هنگام یک restcall اتفاق میافتد 
و دو subscriber روی این event رجیستر کرده اند


### event 
هر event باید بچه ی AbstractEvent باشند

```java

@Getter
public class EventA extends ApplicationEvent {

    private final String message;

    @Builder
    public EventA(Object source, String message) {
        super(source);
        this.message = message;
    }

}

```

### publish an event
زمانی که نیاز به انتشار یک Event داشته باشیم میتوانیم از
‍‍‍‍```ApplicationEventPublisher``` استفاده کنیم که این bean در context موجود است

به عنوان مثال در اینجا یک Event از نوع EventA به هنگام یک RestCall انتشار می یابد


```java 

@Slf4j
@RestController
@RequestMapping("/A")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ServiceA {


    private final ApplicationEventPublisher eventPublisher;


    @GetMapping
    public void startAEvent() {

        log.info("before publish event A");

        EventA event = EventA.builder()
            .source(this)
            .message("event a")
            .build();

        eventPublisher.publishEvent(event);

        log.info("after publish event A");
    }

}

```

### subscribe to event
هنگامی که نیاز داشته باشیم به یک Event انتشار یافته گوش دهیم باید
```ApplicationListener``` را پیاده سازی کنیم

به عنوان مثال این کد به Event های انتشار یافته از نوع EventA گوش میکند

```java
@Slf4j
@Component
public class EventASubscriber implements ApplicationListener<EventA> {

    @Override
    public void onApplicationEvent(EventA event) {
        log.info("received new event {} from {} at {}",
             event.getMessage(), event.getSource(), event.getTimestamp());
    }

}
```

### تقدم و تاخر subscriber ها
برای اینکه بتوانیم بگوییم یک subscriber زود تر از دیگری روی یک event اجرا شود
میتوانیم از ```@Order``` استفاده کنیم که هر چه مقدار درونش کمتر باشد
subscriber زود تر اجرا میشود

### نکات
* لازم به ذکر است که subscriber ها با thread فعلی اجزا میشنود یعنی
thread انتشار دهنده event هنگام انتشار block میشود و subscriber ها اجزا میشوند

[![application logs](../img/spring/application-event/logs.png)](../img/spring/application-event/logs.png)
