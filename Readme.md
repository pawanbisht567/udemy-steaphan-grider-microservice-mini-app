Deployment, Replicaset, PODs, services all of them refer to as Objects in K8s.
All Objects that we create are made by first creating the config file and then applying that config file to our cluster

```
  kubectl apply -f <file-name?.yml
  kubectl get deployments
  kubectl get pods
  kubectl logs <pod-name>
```

We need to use the images from the docker-hub, so we need to push them to docker hub
```
docker build -t pawanbisht94/posts .
docker push pawanbisht94/posts
```

then
```
kubectl rollout restart deployment <deployment-name>
```

In service
port: 4000    means which PORT number runs on POD
targetPort: 4000   means which PORT number runs on the SERVICE

```
kubectl describe service posts-srv
Name:                     posts-srv
Namespace:                default
Labels:                   <none>
Annotations:              <none>
Selector:                 app=posts
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
IP:                       10.96.73.212
IPs:                      10.96.73.212
Port:                     posts  4000/TCP
TargetPort:               4000/TCP
NodePort:                 posts  31842/TCP
Endpoints:                10.244.0.3:4000,10.244.0.7:4000
Session Affinity:         None
External Traffic Policy:  Cluster
Internal Traffic Policy:  Cluster
Events:                   <none>
```

For getting the response of the container from the browser we can use the 31842/TCP
but we generally use the below command

```
kubectl port-forward service/posts-srv 4000:4000
```

Inside Kubernetes Cluster

           Request
              ↓
   event-bus-svc:4005 (this service itself listening to this PORT number)
        (Service Port)
              ↓
   forwards traffic to
              ↓
       Pod Container (Int this if our application POD runs on the 4005 then svc forward this port to 4005)
           :4005
       (targetPort)


              Service
           event-bus-svc
                 :4005
                    ↓
          selector: app=event-bus
                    ↓
         ┌──────────────────┐
         │      Pod         │
         │ app=event-bus    │
         │ Container:4005   │
         └──────────────────┘

Note : In this we Generally send the data from POST service to EVENT BUS service via through CLUSTER-IP service,
then EVENT service sends the DATA to COMMENT or MODERATION svc, via the respective CLUSTER-IP services.
Means
CLUSTER-IP(EVENT-BUS) -> EVENT-BUS -> DATA -> CLUSTER-IP (COMMENT) -> COMMENT POD 